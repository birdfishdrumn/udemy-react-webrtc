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
  rtcPeerConnection: RTCPeerConnection
  _setRtcClient: (rtc: RtcClient) => any
  mediaStream: MediaStream | null
  firebaseSignallingClient: FirebaseSignallingClient
  remoteVideoRef:React.MutableRefObject<any>



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
    const audioTrack: MediaStreamTrack | undefined = this.mediaStream?.getAudioTracks()[0]
    if (audioTrack && this.mediaStream) {
      this.rtcPeerConnection.addTrack(audioTrack, this.mediaStream)
    }
  };

    addVideoTrack() {
      const videoTrack: MediaStreamTrack | undefined = this.mediaStream?.getVideoTracks()[0]
      if (videoTrack && this.mediaStream) {
            this.rtcPeerConnection.addTrack(videoTrack,this.mediaStream)
      }
  };

  setOntrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (rtcTrackEvent.track.kind === "video") return;
      const remoteMediaStream = rtcTrackEvent.streams[0]
      this.remoteVideoRef.current.srcObject = remoteMediaStream;
      this.setRtcClient()
    }

    this.setRtcClient()
  }

  connect(remotePeerName:string) {
    this.remotePeerName = remotePeerName
    this.setOnicecandidateCallback()
    this.setOntrack();
    this.setRtcClient()
  }

  setOnicecandidateCallback() {
    this.rtcPeerConnection.onicecandidate = (candidate) => {
      if (candidate) {
        console.log({candidate})
      }
    }
  }


  startListening(localPeerName:string) {
    this.localPeerName = localPeerName;
    this.setRtcClient()
    // ここにシグナリングサーバーをリッスンする処理を追加する。
this.firebaseSignallingClient.database
.ref(localPeerName).on("value", (snapshot) => {
      const data = snapshot.val()
    } ) //localPeernameをリッスンする

  };
}
