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

  // 初回にuseRtcClientフックにてuseEffectで実行される関数
  async setMediaStream() {
    await this.getUserMedia() // メディアストリームの設定
    this.addTracks() //オーディオトラックの設定
    this.setRtcClient() //rtcClientの更新
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

  async offer() {
    const sessionDescription = await this.createOffer()
    if (sessionDescription) {
         await  this.setLocalDescription(sessionDescription)
    }
    await this.sendOffer()
  }

  async createOffer() {
    try {
          return await this.rtcPeerConnection.createOffer()
    } catch (e) {
      console.error(e)
    }
  }

  async setLocalDescription(sessionDescription: RTCSessionDescriptionInit) {
    try {
        await  this.rtcPeerConnection.setLocalDescription(sessionDescription)
    } catch (e) {
      console.error(e)
    }
  }

  // 二つの名前が揃ったらオファーを送る
  async sendOffer() {
    await this.firebaseSignallingClient.setPeerNames(
      this.localPeerName,
      this.remotePeerName
    )

    // console.log(await this.rtcPeerConnection.localDescription?.toJSON())
    await this.firebaseSignallingClient.sendOffer(this.localDescription)
  }

  setOntrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent: RTCTrackEvent) => {
      if (rtcTrackEvent.track.kind === "video") return;
      const remoteMediaStream: MediaStream = rtcTrackEvent.streams[0]
      this.remoteVideoRef.current.srcObject = remoteMediaStream;
      this.setRtcClient()
    }

    this.setRtcClient()
  }
 //　相手の名前が入力されたら実行される関数 inputFormRemoteより
  async connect(remotePeerName:string) {
    this.remotePeerName = remotePeerName
    this.setOnicecandidateCallback() //candidateを送信
    this.setOntrack(); //remoteVideoRefのcurrentをremoteMediaStreamに更新
    await this.offer() //offerを送信する処理
    this.setRtcClient() //rtcClientの情報を更新
  }

  get localDescription() {
    return this.rtcPeerConnection.localDescription?.toJSON()
  }

  setOnicecandidateCallback() {
    this.rtcPeerConnection.onicecandidate = (candidate:RTCPeerConnectionIceEvent) => {
      if (candidate) {
        console.log({candidate})
      }
    }
  }

//最初の名前が入力されたら実行される関数 inputFormLocalから実行
  startListening(localPeerName:string) {
    this.localPeerName = localPeerName;
    this.setRtcClient()
    // ここにシグナリングサーバーをリッスンする処理を追加する。
this.firebaseSignallingClient.database
.ref(localPeerName).on("value", (snapshot) => {
      const data = snapshot.val()
    } ) //localPeernameをリッスンする

  };

  setPeerNames(localPeerName:string, remotePeerName:string) {
    this.localPeerName = localPeerName
    this.remotePeerName = remotePeerName
  }
}
