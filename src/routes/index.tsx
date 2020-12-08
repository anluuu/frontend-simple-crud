import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard';
import Login from '../components/Login';
import Register from '../components/register';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
