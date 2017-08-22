import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, IndexRoute, Switch} from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';

ReactDOM.render(
    <HashRouter>
        <Switch>
        <Route path="/" component={App}/>
        {/* <IndexRoute component={Greetings} /> */}
        <IndexRoute component={Greetings} />
        {/* <Route path='/xyz' component={XYZ} /> */}
        </Switch>
    </HashRouter>
  ,
  document.getElementById('app')
);
