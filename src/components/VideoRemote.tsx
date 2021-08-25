import React, { useRef, useEffect } from 'react'
import Video from "./Video";
import RtcClient from "src/utils/RtcClient";


interface Props {
  rtcClient: RtcClient

}

const VideoRemote:React.VFC<Props> = ({rtcClient}) => {
  const videoRef = rtcClient.remoteVideoRef

    if(rtcClient.remotePeerName === "") return <></>

  return (
    <Video isLocal={false}
         rtcClient={rtcClient}
      name={rtcClient.remotePeerName}
      videoRef={videoRef} />
  )
}

export default VideoRemote
