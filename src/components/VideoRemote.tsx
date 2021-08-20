import React, { useRef, useEffect } from 'react'
import Video from "./Video";
type Constrains = {
    audio: boolean;
    video: boolean | {
        width: number;
        height: number;
    };
}

interface Props {
  name: string

}

const VideoRemote:React.VFC<Props> = ({name}) => {
  const videoRef = null


  return (
    <Video isLocal={false} name={name} videoRef={videoRef}/>
  )
}

export default VideoRemote
