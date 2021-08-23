import React, { useState,useReducer,useEffect } from 'react';
import { Button } from "@material-ui/core"
import InputForms from "./InputForms";
import VideoArea from "./VideoArea";
import RtcClient from "src/utils/RtcClient";
import {useRtcClient} from "src/components/hooks/useRtcClient"



function App() {
    const rtcClient = useRtcClient()
    // 強制的に際レンダリングさせる為のレデューサー
    //  const [rtcClient,_setRtcClient] = useState<RtcClient>(new RtcClient());

    return <div >
        <InputForms rtcClient = {rtcClient}/>
        <VideoArea
            rtcClient = {rtcClient}
        />

    </div>;
}

export default App;
