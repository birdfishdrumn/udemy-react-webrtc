export default class RtcClient {
  localPeerName: string
  remotePeerName: string
  rtcPeerConnection: any
  _setRtcClient:(rtc:RtcClient) => any
  constructor(setRtcClient:(rtc:RtcClient) => any) {
    const config = {
      iceServers: [{
          urls: "stun:stun.stunprotocol.org"}]
    };
    this.rtcPeerConnection = new RTCPeerConnection(config)
    this.localPeerName = ""
    this.remotePeerName = ""
    this._setRtcClient = setRtcClient;
  }

  setRtcClient() {
    this._setRtcClient(this)
  }
}
