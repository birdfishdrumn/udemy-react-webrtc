import React,{useRef,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
});

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
  const classes = useStyles();

  const refCard = useRef(null)
  const dimensionsCard:Dimensions = useDimensions(refCard)


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
          isLocal={isLocal}
          muted={muted}
        rtcClient = {rtcClient}
          setMuted={setMuted} />
      </CardActions>
    </Card>
  );
}

export default Video
