import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import BodyNavigationBar from './BodyNavigationBar';

export default () => {
  return (
    <div className="main">
      <div className="bodyNavigation"> <BodyNavigationBar /> </div>
      <div className=" container row ">
        <div className="quotes">
          <h1 className="books">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”</h1>
          <h2 className="author"> ~Jane Austen, Northanger Abbey</h2>
        </div>
        <Link to="/login" className="waves-effect waves-light btn col s2 offset-m3 "> Login </Link>
        <Link className="waves-effect waves-light btn col s2 offset-m1" to="/register"> Sign Up </Link>
      </div>
    </div>
  );
};

