import React from 'react';


class BodyNavigationBar extends React.Component {
  render(){
  $(document).ready(function(){
    $(".button-collapse").sideNav();
  })
  return (
      <div className="container-fluid navbar-fixed">
         <nav>
         <div className="nav-wrapper teal">
           <a href="#!" className="brand-logo">HelloBooks</a>
           <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
           <ul className="right hide-on-med-and-down">
             <li><a href="/library">Library</a></li>
             <li><a href="/history">History</a></li>
             <li><a href="/profile">Profile</a></li>
             <li><a href="/">Log Out</a></li>
           </ul>
           <ul className="side-nav" id="mobile-demo">
           <li><a href="/library">Library</a></li>
           <li><a href="/history">History</a></li>
           <li><a href="/profile">Profile</a></li>
           <li><a href="/">Log Out</a></li>
           </ul>
         </div>
       </nav>
               
      </div>
   );
}
};

export default (BodyNavigationBar);
