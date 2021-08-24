import React from 'react'
import IconButton from "@material-ui/core/IconButton"
import  VolumeOffIcon from "@material-ui/icons/VolumeOff"
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import RtcClient from "src/utils/RtcClient"

interface Props {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>
  rtcClient: RtcClient
  isLocal:boolean
}

const VolumeButton: React.VFC<Props> = ({ muted, setMuted,rtcClient,isLocal }) => {

  const Icon = muted ? VolumeOffIcon : VolumeUpIcon

  return (
    <IconButton onClick={() => {
      setMuted((prevState: boolean) => !prevState)
      // 以下はLocalだけで実行可能
      if(isLocal)rtcClient.toggleAudio()
    }}>
      <Icon/>
    </IconButton>
  )
}

export default VolumeButton
