import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import App from './components/App';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Library from './components/user/Library';
import Profile from './components/user/Profile';
import History from './components/user/History';
import Dashboard from './components/admin/Dashboard';
import AddBooks from './components/admin/AddBooks';
import AdminBooks from './components/admin/AdminBooks';
import EditBook from './components/admin/EditBook';

export default(
  <BrowserRouter>
    <Switch>
      <App>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={SignIn}/>
        <Route exact path="/register" component={SignUp}/>
        <Route exact path="/library" component={Library}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/history" component={History}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/addbooks" component={AddBooks}/>
        <Route exact path="/books" component={AdminBooks}/>
        <Route exact path="/editBook" component={EditBook}/>
        <Redirect push to="/"/>
      </App>
    </Switch>
  </BrowserRouter>
);
