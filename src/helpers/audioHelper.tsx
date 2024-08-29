import { BehaviorSubject } from "rxjs"

type AudioState =
  "loading"
  | "not supported"
  | "playing"
  | "idle"
  | "ready"
  | "error"

class AudioHelper {
  private static _instance: AudioHelper;
  private _audioState: BehaviorSubject<AudioState> = new BehaviorSubject("loading")
  private _error: any | null = null

  private _analyser: AnalyserNode | null = null
  private _audioCtx: AudioContext | null = null
  private _bufferLength: number | null = null
  private _dataArray: Uint8Array | null = null
  private _stream: MediaStream | null = null
  private _mediaRecorder: MediaRecorder | null = null
  private _mediaChunks: [] | null = null


  // empty, singleton is initialized in init()
  constructor() { }

  public static get instance(): AudioHelper {
    return this._instance
  }

  public static init() {
    if (AudioHelper._instance) return;
    AudioHelper._instance = new AudioHelper();
    const i = AudioHelper._instance;
    // check if audio supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // audio not supported
      i._audioState?.next("not supported")
      return;
    }

    i._audioCtx = new AudioContext();
    i._analyser = i._audioCtx.createAnalyser();
    i._bufferLength = i._analyser.frequencyBinCount;
    i._dataArray = new Uint8Array(i._bufferLength)
    i._analyser.getByteTimeDomainData(i._dataArray)
    i._audioState.next("loading")
    i.resetStream()
  }

  private async resetStream() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(stream => {
        this._stream = stream
        this._mediaRecorder = new MediaRecorder(stream)
        this._audioState?.next("idle")
        this._error = "null"
      })
      .catch(err => {
        console.error(`error with navigator.mediaDevices.getUserMedia(): ${err}`)
        this._audioState?.next("error")
        this._error = err
      })
  }

  public get currentAudioState(): AudioState {
    return this._audioState.value;
  }

  public start() {
    if (this.currentAudioState === ("ready" as AudioState)) {
      this._mediaRecorder?.ondataavailable = (e) => {
        // TODO: setup
      }
      this._mediaRecorder?.start()
    }
  }


}

export default AudioHelper 