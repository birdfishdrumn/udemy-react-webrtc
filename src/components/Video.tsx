import React,{useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import { useDimensions } from "src/components/hooks/useDimensions";


const useStyles = makeStyles({
});

interface Props {
  name: string;
  videoRef: React.MutableRefObject<any> | null
  isLocal:boolean
}

const  Video:React.VFC<Props> = ({isLocal,name,videoRef}) => {
  const classes = useStyles();

  const refCard = useRef(null)
  const dimensionsCard = useDimensions(refCard)


  return (
    <Card ref={refCard}>
      <CardActionArea>
          <video
        muted={isLocal} //自分の音声をミュートする
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
      </CardActions>
    </Card>
  );
}

export default Video
