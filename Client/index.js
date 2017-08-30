import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import Greetings from './components/Greetings';
import SignUp from './components/SignUp';
import AppContent from './components/content/AppContent';
import Library from './components/content/Library';
import Profile from './components/content/Profile';
import History from './components/content/History';
import './styles/index'

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
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
    </Provider>
  ,
  document.getElementById('app')
);
