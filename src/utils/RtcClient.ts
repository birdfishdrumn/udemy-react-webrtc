
type Constrains = {
    audio: boolean;
    video: boolean | {
        width: number;
        height: number;
    };
}

export default class RtcClient {
  localPeerName: string
  remotePeerName: string
  rtcPeerConnection: any
  _setRtcClient: (rtc: RtcClient) => any
  mediaStream:MediaStream | null
  constructor(setRtcClient:(rtc:RtcClient) => any) {
    const config = {
      iceServers: [{
          urls: "stun:stun.stunprotocol.org"}]
    };
    this.rtcPeerConnection = new RTCPeerConnection(config)
    this.localPeerName = ""
    this.remotePeerName = ""
    this._setRtcClient = setRtcClient;
    this.mediaStream = null
  }

  setRtcClient() {
    this._setRtcClient(this)
  }

  async getUserMedia() {
    try {
        const constraints: Constrains = { video: true, audio: true }
       this.mediaStream =  await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.error(error)
    }

  }

  startListening(localPeerName:string) {
    this.localPeerName = localPeerName;
    this.setRtcClient()
    // ここにシグナリングサーバーをリッスンする処理を追加する。
  }
}
