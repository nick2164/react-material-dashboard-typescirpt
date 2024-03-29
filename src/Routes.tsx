import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
// Views
import Dashboard from './views/Dashboard';
import Contacts from './views/Contacts';
import Queues from './views/Queues';
import NotFound from './views/NotFound';
import SignIn from './views/SignIn';
import Authentication from './components/Authentication';
import { createBrowserHistory } from 'history';
// Browser history
const browserHistory = createBrowserHistory();

// import Voicemailbox from './views/Voicemailbox';
// import Statistics from './views/Statistics';
// import Recordings from './views/Recordings';
// import Audit from './views/Audit';
// import ProductList from './views/ProductList';
// import UserList from './views/UserList';
// import Typography from './views/Typography';
// import Icons from './views/Icons';
// import Settings from './views/Settings';
// import SignUp from './views/SignUp';
// import UnderDevelopment from './views/UnderDevelopment';

const Routes: React.FC = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route component={SignIn} exact path="/sign-in" />
        <Authentication location={browserHistory}>
          <Route component={Dashboard} exact path="/dashboard" />
          <Route component={Contacts} exact path="/contacts" />
          <Route component={Queues} exact path="/queues" />
          {/*<Route component={Voicemailbox} exact path="/voicemailbox"/>*/}
          {/*<Route component={Statistics} exact path="/statistics"/>*/}
          {/*<Route component={Recordings} exact path="/recordings"/>*/}
          {/*<Route component={Audit} exact path="/audit"/>*/}
          <Route component={NotFound} exact path="/not-found" />
          {/*<Route component={UserList} exact path="/users"/>*/}
          {/*<Route component={ProductList} exact path="/products"/>*/}
          {/*<Route component={Typography} exact path="/typography"/>*/}
          {/*<Route component={Icons} exact path="/icons"/>*/}
          {/*<Route component={Settings} exact path="/settings"/>*/}
          {/*<Route component={SignUp} exact path="/sign-up"/>*/}
        </Authentication>
        {/*<Route component={UnderDevelopment} exact path="/under-development"/>*/}
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

export default Routes;
