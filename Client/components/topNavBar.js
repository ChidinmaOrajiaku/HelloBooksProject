import React from 'react';

/**
 * 
 * 
 * @class BodyNavigationBar
 * @extends {React.Component}
 */
class topNavBar extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof topNavBar
   */
  render() {
    $(document).ready(() => {
      $('.button-collapse').sideNav();
    });
    return (
      <div className="container-fluid navbar-fixed">
        <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Logo</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
          </ul>
        </div>
      </nav>

      </div>
    );
  }
}

export default (topNavBar);
