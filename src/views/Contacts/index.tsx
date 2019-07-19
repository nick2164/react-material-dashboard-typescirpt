import React from 'react';
// Material helpers
// Material components
import { Grid, makeStyles } from '@material-ui/core';
// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';
// Custom components
import { Users } from './components/index';

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: '100%'
  }
}));

const Contacts = () => {
  const classes = useStyles();
  return (
    <DashboardLayout title="Kontaktbog">
      <div className={classes.root}>
        <Grid container spacing={4} component={Grid}>
          <Grid item lg={3} sm={6} xl={3} xs={12} component={Grid}>
            <Users className={classes.item}/>
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};

export default Contacts;
