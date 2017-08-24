import React from 'react';


export default () => {
        $(".button-collapse").sideNav();
  return (
      <div className="container-fluid">
         <nav>
         <div className="nav-wrapper teal">
           <a href="#!" className="brand-logo">Logo</a>
           <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
           <ul className="right hide-on-med-and-down">
             <li><a href="/library">Library</a></li>
             <li><a href="collapsible.html">History</a></li>
             <li><a href="mobile.html">Profile</a></li>
           </ul>
           <ul className="side-nav" id="mobile-demo">
             <li><a href="badges.html">Library</a></li>
             <li><a href="collapsible.html">History</a></li>
             <li><a href="mobile.html">Profile</a></li>
           </ul>
         </div>
       </nav>
               
      </div>
   );
};
