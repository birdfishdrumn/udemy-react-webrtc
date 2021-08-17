import React from 'react';
import { Button } from "@material-ui/core"
import InputFormLocal from "./InputFormLocal";

type Constrains ={
    audio: boolean;
    video: boolean | {
        width: number;
        height: number;
    };
}

async function getMedia():Promise<MediaStream | undefined> {
    const constraints: Constrains = { video:true,audio:true}

  try {
   return await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch(err) {
      /* エラーを処理 */
      console.error(err)
  }
}
getMedia()

function App() {

    return <div >
        <InputFormLocal/>

    </div>;
}

export default App;
