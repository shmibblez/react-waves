import { BehaviorSubject } from "rxjs";
import { Chord, Note } from "./chordMaster";

export type AudioState =
  | "loading"
  | "not supported"
  | "listening"
  | "idle"
  | Error;

type nLF = { f: number; a: number }[];

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
   * @param sortBy sort returned list by a or f (amplitude or frequency)
   * @returns descending list of objects containing frequencies [f] and amplitues [a]
   */
  public nLoudestFrequencies(n: number, sortBy: "a" | "f" = "a"): nLF {
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
    // sort descending
    decodedList.sort((a, b) => {
      return b[sortBy] - a[sortBy];
    });
    return decodedList.slice(0, n);
  }

  /**
   * @throws Error if chord not found
   * @returns chord promise
   */
  public async findChord(nStrings: number): Promise<Chord> {
    /// store nSample prominent frequencies lists from fft
    // listens for minimum 40*100 ms = 4 seconds
    let freqs: nLF[] = [];
    const nSamples = 40;
    const samplePeriod = 100; // ms
    async function sleep(ms: number) {
      return new Promise((r) => setTimeout(r, ms));
    }
    let gud: boolean = false;
    let chord: Chord;
    while (!gud) {
      /// get frequencies, if not at desired size sleep and continue
      freqs.push(this.nLoudestFrequencies(nStrings));
      if (freqs.length < nSamples) {
        await sleep(samplePeriod);
        continue;
      }
      if (freqs.length > nSamples) {
        freqs = freqs.slice(0, nSamples);
      }
      /// check if all arrays contain same frequencies
      // create base frequency list
      let fBase = freqs[0];
      for (let j = 1; j < freqs.length; j++) {
        // for each list
        for (let k = 0; k < fBase.length; k++) {
          // if one note different return
          const fCase = freqs[j];
          if (fBase[k].f != fCase[k].f) {
            continue;
          }
        }
      }
      /// discard notes if any major changes in volume (TODO)
      let f = fBase.map((v) => v.f);
      const a = fBase.map((v) => v.a);
      const loudest = a.sort((a, b) => b - a);
      // find 2 loudest amplitudes
      const maxA = loudest[0];
      const max2A = loudest[1];
      if (maxA / 2 > max2A) {
        // if all notes more than half quiet, single note being played
        const imaxA = a.indexOf(maxA);
        f = [f[imaxA]];
      }
      // filter out quiet notes
      if (f.length > 1) {
        // if more than one note being played
        // establish minimum amplitude to be 2/3 * maxA
        const min = (maxA * 2) / 3;
        f = f.filter((v) => v >= min);
      }
      /// set chord
      chord = Chord.fromFrequencies(f);
      gud = true;
    }
    console.log(`chord: ${chord.intervals}`);
    return chord;
  }
}
