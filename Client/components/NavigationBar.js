import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
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
 * @returns {any} event
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
   * @returns {any} sideNav
   * @memberof NavigationBar
   */
  componentDidMount() {
    $('.button-collapse').sideNav('show');
  }
  /**
  * @returns {ReactElement} markup
  * @memberof NavigationBar
  */
  render() {
    const { logout } = this.props;
    const { isAuthenticated } = this.props.auth;

    const adminLinks = (
      <div>
        <li><Link to="/dashboard"><i className="material-icons">account_circle</i>Dashboard</Link></li>
        <li><Link to="/addbooks"><i className="material-icons">file_upload</i>Upload Book</Link></li>
        <li><Link to="/books"><i className="material-icons">book</i>Books</Link></li>
        <li><Link to="/admin"><i className="material-icons">photo_library</i>Profile</Link></li>
        <li><a onClick={this.logout.bind(this)}><i className="material-icons">fast_rewind</i>Log Out</a></li>
      </div>
    );

    const userLinks = (
      <div>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><a onClick={this.logout.bind(this)}>Log Out</a></li>
      </div>
    );

    return (
      <div className="container-fluid">
        <ul id="slide-out" className="side-nav fixed">
          <li><div className="user-view">
            <a to="#" className="brand-logo">HelloBooks</a>
            <div className="background">
            </div>
            <a href="#!user"><img className="circle" src="https://cdn-images-1.medium.com/fit/c/200/200/1*P8ve1Obc8tLIyWgwlx1E8A.jpeg"/></a>
            <a href="#!name"><span className="white-text name">John Doe</span></a>
            <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
          </div></li>
          { localStorage.username === 'admin96' && isAuthenticated ? adminLinks : userLinks }
        </ul>
        <a to="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
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
 * @returns {state} map state to props
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
    
  };
}

export default connect(mapStateToProps, { logout })(withRouter(NavigationBar));
