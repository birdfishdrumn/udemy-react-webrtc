import React from 'react'

interface Props {
  name: string;
  videoRef: React.MutableRefObject<any> | null
  isLocal:boolean
}

const Video:React.VFC<Props> = ({isLocal,name,videoRef}) => {
  return (
    <div>
      <video
        muted={isLocal} //自分の音声をミュートする
        autoPlay
        ref={videoRef}
      />
      <div>
        {name}
      </div>


    </div>
  )
}

export default Video
