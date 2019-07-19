import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// Views
import Dashboard from './views/Dashboard';
import Account from './views/Account';
import Contacts from './views/Contacts';
import Voicemailbox from './views/Voicemailbox';
import Statistics from './views/Statistics';
import Recordings from './views/Recordings';
import Audit from './views/Audit';
import NotFound from './views/NotFound';
// import ProductList from './views/ProductList';
// import UserList from './views/UserList';
// import Typography from './views/Typography';
// import Icons from './views/Icons';
// import Settings from './views/Settings';
// import SignUp from './views/SignUp';
// import SignIn from './views/SignIn';
// import UnderDevelopment from './views/UnderDevelopment';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard"/>
      <Route component={Dashboard} exact path="/dashboard"/>
      <Route component={Account} exact path="/account"/>
      <Route component={Contacts} exact path="/contacts"/>
      <Route component={Voicemailbox} exact path="/voicemailbox"/>
      <Route component={Statistics} exact path="/statistics"/>
      <Route component={Recordings} exact path="/recordings"/>
      <Route component={Audit} exact path="/audit"/>
      <Route component={NotFound} exact path="/not-found"/>
      {/*<Route component={UserList} exact path="/users"/>*/}
      {/*<Route component={ProductList} exact path="/products"/>*/}
      {/*<Route component={Typography} exact path="/typography"/>*/}
      {/*<Route component={Icons} exact path="/icons"/>*/}
      {/*<Route component={Settings} exact path="/settings"/>*/}
      {/*<Route component={SignUp} exact path="/sign-up"/>*/}
      {/*<Route component={SignIn} exact path="/sign-in"/>*/}
      {/*<Route component={UnderDevelopment} exact path="/under-development"/>*/}
      <Redirect to="/not-found"/>
    </Switch>
  );
};

export default Routes;
