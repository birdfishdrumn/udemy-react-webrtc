import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VideoLocal from "./VideoLocal";
import VideoRemote from "./VideoRemote";
import RtcClient from "src/utils/RtcClient";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface Props {
  rtcClient:RtcClient | null
}

const VideoArea: React.VFC<Props> = ({ rtcClient}) => {
  const classes = useStyles();

  if(rtcClient === null) return <></>

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <VideoLocal rtcClient={rtcClient}/>
        </Grid>
            <Grid item xs={12} sm={6}>
                   <VideoRemote  rtcClient={rtcClient}/>
        </Grid>



      </Grid>
    </div>
  );
}

export default VideoArea
