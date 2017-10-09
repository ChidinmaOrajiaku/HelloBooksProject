import React from 'react';

/**
 * 
 * 
 * @class BodyNavigationBar
 * @extends {React.Component}
 */
class BodyNavigationBar extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof BodyNavigationBar
   */
  render() {
    $(document).ready(() => {
    $(".button-collapse").sideNav();
  });
    return (
      <div className="container-fluid navbar-fixed">
        <nav>
          <div className="nav-wrapper teal">
            <a href="#!" className="brand-logo">HelloBooks</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="/register">Sign Up</a></li>
              <li><a href="/login">Sign In</a></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
            <li><a href="/register">Sign Up</a></li>
            <li><a href="/login">Sign In</a></li>
            </ul>
          </div>
        </nav>

      </div>
    );
  }
}

export default (BodyNavigationBar);
