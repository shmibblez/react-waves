import { BehaviorSubject } from "rxjs";

export type AudioState =
  | "loading"
  | "not supported"
  | "listening"
  | "idle"
  | Error;

export class AudioHelper {
  private static _instance: AudioHelper;

  private _initialized: boolean = false;
  private _audioState: BehaviorSubject<AudioState>;
  private _analyserNode: AnalyserNode | null;
  private _audioCtx: AudioContext | null;
  private _bufferLength: number | null;
  private _dataArray: Float32Array | null;
  // require loading
  private _audio: MediaStream | null = null;
  private _sourceNode: MediaStreamAudioSourceNode | null = null;

  constructor() {
    this._audioState = new BehaviorSubject<AudioState>("idle");
  }

  public static get instance(): AudioHelper {
    // if already exists return
    if (AudioHelper._instance) return AudioHelper._instance;
    // if doesnt exist create
    AudioHelper._instance = new AudioHelper();
    return AudioHelper._instance;
  }

  public get audioState(): BehaviorSubject<AudioState> {
    return this._audioState;
  }

  public get currentAudioState(): AudioState {
    return this._audioState.value;
  }

  public get dataArray(): Float32Array {
    this._analyserNode.getFloatFrequencyData(this._dataArray);
    return this._dataArray;
  }

  private audioSupported(): boolean {
    // check if audio supported
    return (
      navigator &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      true
    );
  }

  public start() {
    if (!this.audioSupported()) {
      AudioHelper._instance._audioState?.next("not supported");
    }
    if (!this._initialized) {
      // constants
      const sampleRate = 44100; // Hz
      // minFInterval = 18.501 // Hz
      // sampleRate / minFInterval = approx 2383, 4096 is nearest greatest power of 2
      const fftSize = 4096;
      // audio ctx & analyser
      this._audioCtx = new AudioContext({ sampleRate: sampleRate });
      this._analyserNode = this._audioCtx.createAnalyser();
      this._analyserNode.fftSize = fftSize;
      this._analyserNode.smoothingTimeConstant = 0.8;
      // data array setup
      this._bufferLength = this._analyserNode.frequencyBinCount;
      this._dataArray = new Float32Array(this._bufferLength);
      // this._analyser.getFloatFrequencyData(this._dataArray);
      // set initialized
      this._initialized = true;
    }
    if (!this._audio || !this._audio.active) {
      this._audioState.next("loading");
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((audio) => {
          // ref audio stream
          this._audio = audio;
          // ref media source
          this._sourceNode = this._audioCtx.createMediaStreamSource(
            this._audio
          )!;
          // connect nodes
          this._sourceNode.connect(this._analyserNode);
          this._analyserNode.connect(this._audioCtx.destination);
          // update state
          this._audioState?.next("listening");
        })
        .catch((err) => {
          console.error(
            `error with navigator.mediaDevices.getUserMedia(): ${err}`
          );
          this._audioState?.next(new Error(err));
        });
    } else {
      // ref media source
      this._sourceNode = this._audioCtx?.createMediaStreamSource(this._audio)!;
      // connect nodes
      this._sourceNode.connect(this._analyserNode);
      this._analyserNode.connect(this._audioCtx.destination);
      // update state
      this._audioState?.next("listening");
    }
  }

  public stop() {
    this._audio?.getTracks().forEach((t) => {
      // stop all tracks
      t.stop();
      // disconnect media stream
      this._sourceNode?.disconnect();
      // update state
      this._audioState?.next("idle");
    });
  }

  /**
   * @param n how many loudest frequencies
   * @returns list of objects containing frequencies [f] and amplitues [a]
   */
  public nLoudestFrequencies(n: number): { f: number; a: number }[] {
    const l = this.dataArray;
    if (!l) return [];

    const decodedList = [];
    const binInterval = 44100 / l!.length;
    for (var i = 0; i < l!.length; i++) {
      decodedList.push({
        f: binInterval * i + binInterval / 2, // frequency
        a: l![i], // amplitude
      });
    }
    decodedList.sort((a, b) => {
      return a.a - b.a;
    });
    return decodedList.slice(0, n);
  }
}
