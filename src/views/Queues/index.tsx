import React from 'react';
// Material helpers
// Material components
import { Container, makeStyles } from '@material-ui/core';
// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';
// Custom components
import { Queues as QueuesView } from 'components/index';

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    flexGrow: 1
  }
}));

const Queues = () => {
  const classes = useStyles();
  return (
    <DashboardLayout title="Køer">
      <Container maxWidth={false} classes={classes}>
        <QueuesView height={900}/>
      </Container>
    </DashboardLayout>
  );
};

export default Queues;
