import React, { useState } from 'react';
import { Button } from "@material-ui/core"
import InputFormLocal from "./InputFormLocal";
import InputFormRemote from "./InputFormRemote";
import VideoArea from "./VideoArea";
import  RtcClient  from "src/utils/RtcClient";



function App() {
    const rtcClient:RtcClient= new RtcClient();
    console.log(rtcClient)

    return <div >
        <InputFormLocal
           rtcClient = {rtcClient}
        />
        <InputFormRemote
            rtcClient = {rtcClient}
        />
        <VideoArea
            rtcClient = {rtcClient}
        />

    </div>;
}

export default App;
