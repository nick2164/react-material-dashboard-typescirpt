import React, { Component } from 'react';

// Material helpers
import { makeStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import {
  Budget,
  Users,
  Progress,
  Profit,
  SalesChart,
  DevicesChart,
  ProductList,
  OrdersTable
} from './components';

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
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget className={classes.item} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Users className={classes.item} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Progress className={classes.item} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Profit className={classes.item} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <SalesChart className={classes.item} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <DevicesChart className={classes.item} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <ProductList className={classes.item} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <OrdersTable className={classes.item} />
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;