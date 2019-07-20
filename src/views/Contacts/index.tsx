import React from 'react';
// Material helpers
// Material components
import { Container, Grid, makeStyles } from '@material-ui/core';
// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';
// Custom components
import { UserList } from './components/index';

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    flexGrow: 1,
  },
  item: {
    height: '100%'
  }
}));

const Contacts = () => {
  const classes = useStyles();
  return (
    <DashboardLayout title="Kontaktbog">
      <Container maxWidth={false} classes={classes}>
        <UserList height={650}/>
      </Container>
    </DashboardLayout>
  );
};

export default Contacts;
