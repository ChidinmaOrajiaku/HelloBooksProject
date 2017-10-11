import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  $(document).ready(() => {
    $('.button-collapse').sideNav();
  });
  return (
    <div className="container-fluid navbar-fixed">
      <nav>
        <div className="nav-wrapper teal">
          <a to="#!" className="brand-logo">HelloBooks</a>
          <a to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
        </div>
      </nav>

    </div>
  );
};

