import React, { useRef, useEffect } from 'react'

type Constrains = {
    audio: boolean;
    video: boolean | {
        width: number;
        height: number;
    };
}

const VideoLocal = () => {
  const videoRef = useRef()
  const currentVideoRef:any = videoRef.current

  useEffect(() => {
        if (currentVideoRef === null) return
    const getMedia = async(): Promise<void>  =>{
    const constraints: Constrains = { video: true, audio: true }

    try {
      const mediaStream:MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
             currentVideoRef.srcObject= mediaStream
        /* ストリームを使用 */
    } catch (err) {
        /* エラーを処理 */
        console.error(err)
    }
}

    getMedia()

  }, [currentVideoRef])

  return (
    <div>

    </div>
  )
}

export default VideoLocal
