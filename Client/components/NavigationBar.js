import React from 'react';


class NavigationBar extends React.Component {
  componentDidMount() {
      $(".button-collapse").sideNav();
   }
  render() {
  return (
      <div className="container-fluid navbar-fixed">
         <nav className="teal">
              <div className="nav-wrapper">
                 <a href="#" className="brand-logo">HelloBooks</a>
                 <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
           <ul className="right hide-on-med-and-down">
             <li><a href="/signup">Sign Up</a></li>
             <li><a href="/login">Login</a></li>
           </ul>
           <ul className="side-nav" id="mobile-demo">
           <li><a href="/register">SignUp</a></li>
           <li><a href="/login">Login</a></li>
           </ul>
         </div>
       </nav>
      </div>
   );
}
};

export default (NavigationBar);
