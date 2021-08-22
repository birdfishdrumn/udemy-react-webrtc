import React, { useState,useReducer } from 'react';
import { Button } from "@material-ui/core"
import InputFormLocal from "./InputFormLocal";
import InputFormRemote from "./InputFormRemote";
import VideoArea from "./VideoArea";
import  RtcClient  from "src/utils/RtcClient";



function App() {
    // 強制的に際レンダリングさせる為のレデューサー
     const [rtcClient,_setRtcClient] = useState<RtcClient>(new RtcClient());
    const [,forceRender] = useReducer((boolean)=> !boolean,false)

    const setRtcClient = (rtcClient:RtcClient) => {
        _setRtcClient(rtcClient)
        forceRender()
    }
    console.log(rtcClient)

    return <div >
        <InputFormLocal
            rtcClient={rtcClient}
            setRtcClient={setRtcClient}
        />
        <InputFormRemote
            rtcClient={rtcClient}
                    setRtcClient={setRtcClient}
        />
        <VideoArea
            rtcClient = {rtcClient}
        />

    </div>;
}

export default App;
