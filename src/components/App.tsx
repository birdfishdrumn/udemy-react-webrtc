import React, { useState } from 'react';
import { Button } from "@material-ui/core"
import InputFormLocal from "./InputFormLocal";
import InputFormRemote from "./InputFormRemote";

type Constrains = {
    audio: boolean;
    video: boolean | {
        width: number;
        height: number;
    };
}

async function getMedia(): Promise<MediaStream | undefined> {
    const constraints: Constrains = { video: true, audio: true }

    try {
        return await navigator.mediaDevices.getUserMedia(constraints);
        /* ストリームを使用 */
    } catch (err) {
        /* エラーを処理 */
        console.error(err)
    }
}
getMedia()

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

    </div>;
}

export default App;
