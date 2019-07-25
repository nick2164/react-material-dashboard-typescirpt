import React, { useState } from 'react';
import { GetQueueInterface } from '../../hooks/managerAPI/queues';
import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import QueueList from './components/QueueList/QueueList';
import QueueMemberList from './components/QueueMemberList/QueueMemberList';

interface QueuesInterface {
  height: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      minWidth: 1020,
    },
    listView: {
      width: '30%',
      minWidth: 300
    },
    tableView: {
      width: '70%',
      minWidth: 714,
      zIndex: 1,
    },
    rootPaper: {
      minWidth: 1020
    }
  })
);

const Queues = (props: QueuesInterface) => {

  const classes = useStyles();

  const queuePlaceholder:GetQueueInterface = {
    description: '',
    queueID: 0,
    calls: {
      averageHoldTime: 0,
      callerCount: 0,
      longestHoldTime: 0,
      totalTalkTime: 0
    },
    members: [],
    settings: {
      ringTime: 0,
      timeout: 0
    }
  };

  const [selectedQueue, setSelectedQueue] = useState(queuePlaceholder);

  if (localStorage.getItem('queueList') === null) {
    localStorage.setItem('queueList', JSON.stringify([]));
  }

  return (
    <Paper className={classes.rootPaper}>
      <Grid container={true} className={classes.root}>
        <Grid item={true} className={classes.listView}>
          <QueueList height={props.height} setSelectedQueue={setSelectedQueue}/>
        </Grid>
        <Grid component={'div'} item={true} className={classes.tableView}>
          <QueueMemberList height={props.height} selectedQueue={selectedQueue}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(Queues);
