import React from 'react';
import ReactDOM from 'react-dom';
// import {AppContainer} from 'react-hot-loader';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
               <Route exact path="/" component={Greetings}/>
           </Switch>
        </App>
    </BrowserRouter>
  ,
  document.getElementById('app')
);
