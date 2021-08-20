import React, { useState } from 'react';
import { Button } from "@material-ui/core"
import InputFormLocal from "./InputFormLocal";
import InputFormRemote from "./InputFormRemote";
import VideoArea from "./VideoArea";




function App() {
    const [localPeerName, setLocalPeerName] = useState<string>("")
    const [remotePeerName, setRemotePeerName] = useState<string>("")
    return <div >
        <InputFormLocal
            localPeerName={localPeerName}
            setLocalPeerName={setLocalPeerName}
        />
        <InputFormRemote
            localPeerName={localPeerName}
            remotePeerName={remotePeerName}
            setRemotePeerName={setRemotePeerName}
        />
        <VideoArea
            localPeerName={localPeerName}
            remotePeerName={remotePeerName}
        />

    </div>;
}

export default App;
