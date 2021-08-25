import React, { useRef, useEffect } from 'react'
import Video from "./Video";
import RtcClient from "src/utils/RtcClient";



interface Props {
  rtcClient: RtcClient

}

const VideoLocal:React.VFC<Props> = ({rtcClient}) => {
  const videoRef = useRef()
  const currentVideoRef: any = videoRef.current
  const mediaStream = rtcClient.mediaStream

  useEffect(() => {
        if (currentVideoRef === null) return
    const getMedia = async(): Promise<void>  =>{

    try {
             currentVideoRef.srcObject= mediaStream
        /* ストリームを使用 */
    } catch (err) {
        /* エラーを処理 */
        console.error(err)
    }
}

    getMedia()

  }, [currentVideoRef,mediaStream])

  console.log({rtcClient})

  if(rtcClient.localPeerName === "" || rtcClient.remotePeerName === "") return <></>

  return (
    <Video isLocal={true}
       rtcClient={rtcClient}
      name={rtcClient.localPeerName}
      videoRef={videoRef} />
  )
}

export default VideoLocal
