import React from 'react';
import App from './components/App';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import Greetings from './components/Greetings';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Library from './components/content/Library';
import Profile from './components/content/Profile';
import History from './components/content/History';
import Dashboard from './components/admin/Dashboard';

export default(
  <BrowserRouter>
    <Switch>
      <App>
        <Route exact path="/" component={Greetings}/>
        <Route exact path="/login" component={SignIn}/>
        <Route exact path="/register" component={SignUp}/>
        <Route exact path="/library" component={Library}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/history" component={History}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </App>
    </Switch>
  </BrowserRouter>
);
