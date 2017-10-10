import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/signinAction';

/**
 * 
 * 
 * @class NavigationBar
 * @extends {React.Component}
 */
class NavigationBar extends React.Component {
/**
 *  
 * @returns
 * @param {any} event 
 * @memberof NavigationBar
 */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }
  /**
   * 
   * 
   * @memberof NavigationBar
   */
  componentDidMount() {
    $('.button-collapse').sideNav('show');
  }
  /**
  * @returns 
  * @memberof NavigationBar
  */
  render() {
    const { logout } = this.props;
    const { isAuthenticated } = this.props.auth;

    const adminLinks = (
      <div>
        <li><a href="/dashboard"><i className="material-icons">account_circle</i>Dashboard</a></li>
        <li><a href="/addbooks"><i className="material-icons">file_upload</i>Upload Book</a></li>
        <li><a href="/books"><i className="material-icons">book</i>Books</a></li>
        <li><a href="/admin"><i className="material-icons">photo_library</i>Profile</a></li>
        <li><a onClick={this.logout.bind(this)}><i className="material-icons">fast_rewind</i>Log Out</a></li>
      </div>
    );

    const userLinks = (
      <div>
        <li><a href="/library">Library</a></li>
        <li><a href="/history">History</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a onClick={this.logout.bind(this)}>Log Out</a></li>
      </div>
    );

    return (
      <div className="container-fluid">
        <ul id="slide-out" className="side-nav fixed">
          <li><div className="user-view">
            <a href="#" className="brand-logo">HelloBooks</a>
            <div className="background">
            </div>
            <a href="#!user"><img className="circle" src="https://cdn-images-1.medium.com/fit/c/200/200/1*P8ve1Obc8tLIyWgwlx1E8A.jpeg"/></a>
            <a href="#!name"><span className="white-text name">John Doe</span></a>
            <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
          </div></li>
          { localStorage.username === 'admin96' && isAuthenticated ? adminLinks : userLinks }
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
      </div>
    );
  }
}


NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

/**
 * 
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(withRouter(NavigationBar));
