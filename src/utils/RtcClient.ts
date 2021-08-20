export default class RtcClient {
  localPeerName: string
  remotePeerName: string
  rtcPeerConnection:any
  constructor() {
    const config = {
      iceServers: [{
          urls: "stun:stun.stunprotocol.org"}]
    };
    this.rtcPeerConnection = new RTCPeerConnection(config)
    this.localPeerName = ""
    this.remotePeerName = ""
  }
}
