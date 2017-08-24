import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';
import AppContent from './components/content/AppContent';
import Library from './components/content/Library';
import './styles/index'

ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={App}/>
        <AppContent>
           <Route exact path="/library" component={Library}/>
        </AppContent>
    </Switch>
    </BrowserRouter>
  ,
  document.getElementById('app')
);
