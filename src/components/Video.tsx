import React,{useRef,useState} from 'react'

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import { useDimensions } from "src/components/hooks/useDimensions";
import VolumeButton from "./VolumeButton";
import RtcClient from "src/utils/RtcClient"
import AudioAnalyser from "./AudioAnalyser"


interface Props {
  name: string;
  videoRef: React.MutableRefObject<any> | null
  isLocal: boolean
  rtcClient:RtcClient
}

type Dimensions = {
  width: number;
  height: number;
}

const Video: React.VFC<Props> = ({ isLocal, name, videoRef,rtcClient }) => {
  const [muted,setMuted] = useState<boolean>(rtcClient.initialAudioMuted)


  const refCard = useRef(null)
  const dimensionsCard: Dimensions = useDimensions(refCard)
  const refVolumeButton = useRef(null)
  const dimensionsVolumeButton = useDimensions(refVolumeButton)
  if (videoRef?.current) {
    console.log({isLocal,srcObject: videoRef?.current.srcObject})
}


  return (
    <Card ref={refCard}>
      <CardActionArea>
          <video
        muted={isLocal || muted} //自分の音声をミュートする
        autoPlay
          ref={videoRef}
          width = {dimensionsCard.width}
      />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
                {name}
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <VolumeButton
          refVolumeButton={refVolumeButton}
          isLocal={isLocal}
          muted={muted}
        rtcClient = {rtcClient}
          setMuted={setMuted} />
        {!muted && videoRef?.current && videoRef?.current.srcObject &&
          <AudioAnalyser audio={videoRef?.current.srcObject}
          width={dimensionsCard.width - dimensionsVolumeButton.width -40}
        />
        }
      </CardActions>
    </Card>
  );
}

export default Video
