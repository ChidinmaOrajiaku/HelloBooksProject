import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';
import SignUp from './components/SignUp';
import AppContent from './components/content/AppContent';
import Library from './components/content/Library';
import Profile from './components/content/Profile';
import History from './components/content/History';
import './styles/index'

ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <App>
          <Route exact path="/" component={Greetings}/>
          <Route exact path="/signup" component={SignUp}/>
          </App>
        <AppContent>
           <Route exact path="/library" component={Library}/>
           <Route exact path="/profile" component={Profile}/>
           <Route exact path="/history" component={History}/>
        </AppContent>
    </Switch>
    </BrowserRouter>
  ,
  document.getElementById('app')
);
