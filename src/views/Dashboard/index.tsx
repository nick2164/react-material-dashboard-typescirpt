import React from 'react';
// Material helpers
// Material components
import { makeStyles } from '@material-ui/core';
// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';
// Custom components

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: '100%'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <DashboardLayout title="Dashboard">
      <div className={classes.root}>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
