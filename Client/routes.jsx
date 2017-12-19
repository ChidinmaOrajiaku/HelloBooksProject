import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
import RequireAuth from './utils/RequireAuth';
import NotFound from './components/NotFound';


export default(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/login" component={SignIn}/>
      <Route exact path="/register" component={SignUp}/>
      <Route exact path="/library" component={RequireAuth(Library)}/>
      <Route exact path="/profile" component={RequireAuth(Profile)}/>
      <Route exact path="/history" component={RequireAuth(History)}/>
      <Route exact path="/dashboard" component={RequireAuth(Dashboard)}/>
      <Route exact path="/addbooks" component={RequireAuth(AddBooks)}/>
      <Route exact path="/books" component={RequireAuth(AdminBooks)}/>
      <Route exact path="/editBook" component={RequireAuth(EditBook)}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);
