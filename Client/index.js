import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken'
import { createStore, applyMiddleware, compose } from 'redux';
import { setCurrentUser } from './actions/signinAction'
import App from './components/App';
import Greetings from './components/Greetings';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Library from './components/content/Library';
import Profile from './components/content/Profile';
import History from './components/content/History';
import setAuthToken from './utils/setAuthToken';
import rootReducer from './rootReducer'
import './styles/index'

const store = createStore(
  rootReducer,
  compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

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
