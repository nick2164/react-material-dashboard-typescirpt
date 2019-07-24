import React from 'react';
// Material helpers
// Material components
import { Container, makeStyles } from '@material-ui/core';
// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';
// Custom components
import { QueueList } from './components/index';

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    flexGrow: 1
  },
  item: {
    height: '100%'
  }
}));

const Queues = () => {
  const classes = useStyles();
  return (
    <DashboardLayout title="Køer">
      <Container maxWidth={false} classes={classes}>
        <QueueList height={650}/>
      </Container>
    </DashboardLayout>
  );
};

export default Queues;
