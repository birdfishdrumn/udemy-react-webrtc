import React from 'react';

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
  }
}
getMedia()

function App() {
    const data:string[] = ["huuta","mini"]
    return <div > こんにちは

    </div>;
}

export default App;
