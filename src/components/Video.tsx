import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
}  from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface Props {
  name: string;
  videoRef: React.MutableRefObject<any> | null
  isLocal:boolean
}

const  Video:React.VFC<Props> = ({isLocal,name,videoRef}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
          <video
        muted={isLocal} //自分の音声をミュートする
        autoPlay
        ref={videoRef}
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
