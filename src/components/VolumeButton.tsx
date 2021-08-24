import React from 'react'
import IconButton from "@material-ui/core/IconButton"
import  VolumeOffIcon from "@material-ui/icons/VolumeOff"
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

interface Props {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>
}

const VolumeButton: React.VFC<Props> = ({ muted, setMuted }) => {

  const Icon = muted ? VolumeOffIcon : VolumeUpIcon

  return (
    <IconButton onClick={() => {
      setMuted((prevState:boolean)=> !prevState)
    }}>
      <Icon/>
    </IconButton>
  )
}

export default VolumeButton
