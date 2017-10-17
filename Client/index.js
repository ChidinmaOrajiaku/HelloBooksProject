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
import requireAuth from './utils/requireAuth';
import * as bookActions from './actions/booksAction';
import './styles/index';

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
