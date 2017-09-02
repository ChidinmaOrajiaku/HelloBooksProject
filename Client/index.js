import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import Greetings from './components/Greetings';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Library from './components/content/Library';
import Profile from './components/content/Profile';
import History from './components/content/History';
import './styles/index'

const store = createStore(
  (state = {}) => state,
  compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
        <App>
          <Route exact path="/" component={Greetings}/>
          <Route exact path="/login" component={SignIn}/>
          <Route exact path="/register" component={SignUp}/>
          <Route exact path="/library" component={Library}/>
           <Route exact path="/profile" component={Profile}/>
           <Route exact path="/history" component={History}/>
        </App>
    </Switch>
    </BrowserRouter>
    </Provider>
  ,
  document.getElementById('app')
);
