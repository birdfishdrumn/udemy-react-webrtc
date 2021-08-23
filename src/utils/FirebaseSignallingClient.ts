import firebase from "firebase/app"
import "firebase/database"

export default class FirebaseSignallingClient {
  database: firebase.database.Database
  localPeerName: string;
  remotePeerName: string;
  constructor() {
      const firebaseConfig = {
    apiKey: "AIzaSyCncdW3BcXf0GSpjlFmDNFS5hKRtaQcZHs",
    authDomain: "webrtc-react-firebase-ebde4.firebaseapp.com",
    databaseURL: "https://webrtc-react-firebase-ebde4-default-rtdb.firebaseio.com",
    projectId: "webrtc-react-firebase-ebde4",
    storageBucket: "webrtc-react-firebase-ebde4.appspot.com",
    messagingSenderId: "11382606910",
    appId: "1:11382606910:web:cae6c20aba1989e079556f"
  };
  // Initialize Firebase
    if(firebase.apps.length === 0 )     firebase.initializeApp(firebaseConfig);

    this.database = firebase.database()
    this.localPeerName = "";
    this.remotePeerName = ""
  }

    setPeerNames(localPeerName:string, remotePeerName:string) {
    this.localPeerName = localPeerName;
    this.remotePeerName = remotePeerName;
    }

  get targetRef() {
     return  this.database.ref(this.remotePeerName)
  }

  async sendOffer(sessionDescription:RTCSessionDescription) {
    await this.targetRef.set({
      type: "offer",
      sender: this.localPeerName,
      sessionDescription,
    })
  }
}
