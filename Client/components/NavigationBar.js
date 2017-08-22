import React from 'react';

export default () => {
  return (
      <div className="container-fluid">
         <nav className="teal">
              <div className="nav-wrapper navbar-fixed">
                 <a href="#" className="brand-logo center">Logo</a>
                  <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href="sass.html">Home</a></li>
                    <li><a href="badges.html">Library</a></li>
                    <li><a href="collapsible.html">History</a></li>
                    <li><a href="collapsible.html">Profile</a></li>
                 </ul>
                 <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="sass.html">Log out</a></li>
                 </ul>
             </div>
          </nav>
      </div>
   );
};
