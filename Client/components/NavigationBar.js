import React from 'react';


export default () => {
  return (
      <div className="container-fluid navbar-fixed">
         <nav className="teal">
              <div className="nav-wrapper">
                 <a href="#" className="brand-logo left">HelloBooks</a>
                 <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
           <ul className="right hide-on-med-and-down">
             <li><a href="/signup">Sign Up</a></li>
           </ul>
           <ul className="side-nav" id="mobile-demo">
           <li><a href="/signup">SignUp</a></li>
           </ul>
         </div>
       </nav>
      </div>
   );
};
