import React, { useRef, useEffect } from 'react'
import Video from "./Video";
import RtcClient from "src/utils/RtcClient";


interface Props {
  rtcClient: RtcClient

}

const VideoRemote:React.VFC<Props> = ({rtcClient}) => {
  const videoRef = rtcClient.remoteVideoRef


  return (
    <Video isLocal={false} name={rtcClient.remotePeerName} videoRef={videoRef}/>
  )
}

export default VideoRemote
