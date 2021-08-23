import React from "react";
import FirebaseSignallingClient from "./FirebaseSignallingClient";
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
  mediaStream: MediaStream | null
  firebaseSignallingClient: FirebaseSignallingClient
  remoteVideoRef:React.MutableRefObject<null>



  constructor(remoteVideoRef:React.MutableRefObject<null>,setRtcClient:(rtc:RtcClient) => any) {
    const config = {
      iceServers: [{
          urls: "stun:stun.stunprotocol.org"}]
    };
    this.rtcPeerConnection = new RTCPeerConnection(config)
    this.firebaseSignallingClient = new FirebaseSignallingClient()
    this.localPeerName = ""
    this.remotePeerName = ""
    this.remoteVideoRef = remoteVideoRef
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

  async setMediaStream() {
    await this.getUserMedia()
    this.addTracks()
    this.setRtcClient()
  }



  addTracks() {
    this.addAudioTrack()
     this.addVideoTrack()
  }

  addAudioTrack() {
    console.log({ tracks: this.mediaStream?.getAudioTracks() })
    const audioTrack:MediaStreamTrack | undefined = this.mediaStream?.getAudioTracks()[0]
    this.rtcPeerConnection.addTrack(audioTrack,this.mediaStream)
   }

    addVideoTrack() {
    const videoTrack:MediaStreamTrack | undefined = this.mediaStream?.getVideoTracks()[0]
    this.rtcPeerConnection.addTrack(videoTrack,this.mediaStream)
    }


  startListening(localPeerName:string) {
    this.localPeerName = localPeerName;
    this.setRtcClient()
    // ここにシグナリングサーバーをリッスンする処理を追加する。
this.firebaseSignallingClient.database
.ref(localPeerName).on("value", (snapshot) => {
      const data = snapshot.val()
    } ) //localPeernameをリッスンする

  }
}
