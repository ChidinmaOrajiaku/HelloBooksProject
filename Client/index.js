import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import { createStore, applyMiddleware, compose } from 'redux';

import { setCurrentUser } from './actions/signinAction';
import setAuthToken from './utils/setAuthToken';
import rootReducer from './rootReducer';
import routes from './routes';
import './styles/index';
import './styles/library';
import './styles/profile';
import './styles/adminaddbooks';
import './styles/adminbooks';
import './styles/dashboard';
import './styles/history';
import './styles/signin';
import './styles/signup';
import './styles/notfound';

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>
  ,
  document.getElementById('app')
);
