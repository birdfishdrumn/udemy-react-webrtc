import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VideoLocal from "./VideoLocal";
import VideoRemote from "./VideoRemote";

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
  localPeerName: string
  remotePeerName: string
}

const VideoArea: React.VFC<Props> = ({ localPeerName, remotePeerName }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <VideoLocal name={localPeerName}/>
        </Grid>
            <Grid item xs={12} sm={6}>
                   <VideoRemote/>
        </Grid>



      </Grid>
    </div>
  );
}

export default VideoArea
