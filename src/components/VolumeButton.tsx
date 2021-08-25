import React from 'react'
import IconButton from "@material-ui/core/IconButton"
import  VolumeOffIcon from "@material-ui/icons/VolumeOff"
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import RtcClient from "src/utils/RtcClient"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  icon: {
      height:38,
      width:38
    }
})

interface Props {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>
  rtcClient: RtcClient
  isLocal: boolean
  refVolumeButton:React.MutableRefObject<null>
}

const VolumeButton: React.VFC<Props> = ({ muted, setMuted, rtcClient, isLocal,refVolumeButton }) => {

  const classes = useStyles()

  const Icon = muted ? VolumeOffIcon : VolumeUpIcon

  return (
    <IconButton
    ref={refVolumeButton}
      onClick={() => {
      setMuted((prevState: boolean) => !prevState)
      // 以下はLocalだけで実行可能
      if(isLocal)rtcClient.toggleAudio()
    }}>
      <Icon className={classes.icon}/>
    </IconButton>
  )
}

export default VolumeButton
