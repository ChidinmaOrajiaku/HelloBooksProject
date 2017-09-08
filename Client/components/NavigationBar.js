import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/signinAction'


class NavigationBar extends React.Component {

  logout(event) {
      event.preventDefault();
      this.props.logout()
      this.props.history.push("/")
  }

  componentDidMount() {
     
   }
  render() {
       
    $( document ).ready(function () {
      $(".button-collapse").sideNav();
    })

    const { logout } = this.props
    const { isAuthenticated } = this.props.auth

    const userLinks = (
        <div>
         <li><a href="/library">Library</a></li>
         <li><a href="/history">History</a></li>
         <li><a href="/profile">Profile</a></li>
         <li><a href="/admin">Admin</a></li>
         <li><a onClick={this.logout.bind(this)}>Log Out</a></li>
       </div>
    )

    const guestLinks = (
      <div>
        <li><a href="/register">Sign Up</a></li>
        <li><a href="/login">Login</a></li>
      </div>
    )
  return (
      <div className="container-fluid navbar-fixed">
         <nav className="teal">
              <div className="nav-wrapper">
                 <a href="#" className="brand-logo">HelloBooks</a>
                 <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                 <ul className="right hide-on-med-and-down">
                 { isAuthenticated ? userLinks : guestLinks }
                 </ul>
                 <ul className="side-nav" id="mobile-demo">
                    { isAuthenticated ? userLinks : guestLinks }
                 </ul>
         </div>
       </nav>
      </div>
   );
}
};

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout}) (withRouter(NavigationBar));
