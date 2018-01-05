import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import image from '../img/smiley3.jpg';
import { logout } from '../actions/signinAction';
import { getUserDataRequest } from '../actions/getUser';

/**
 *
 *
 * @class NavigationBar
 * @extends {React.Component}
 */
export class NavigationBar extends React.Component {
  /**
     * @constructor
     * @param {object} props
     */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstname: '',
      lastname: '',
      email: '',
    };
  }

  /**
   *
   * @returns {any} sideNav
   * @memberof NavigationBar
   */
  componentDidMount() {
    this.props.getUserDataRequest(this.props.usersId);
    $('.button-collapse').sideNav('show');
  }

  /**
   *
   * @returns {nextProps} next props
   * @param {any} nextProps
   * @memberof NavigationBar
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.getUserData) {
      this.setState({
        firstname: nextProps.getUserData.firstname,
        lastname: nextProps.getUserData.lastname,
        email: nextProps.getUserData.email
      });
    }
  }

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
  * React Element Markup
  * @returns {object} response object
  * @memberof NavigationBar
  */
  render() {
    const { isAuthenticated } = this.props.auth;

    const adminLinks = (
      <div>
        <li>
          <Link to="/dashboard">
            <i className="material-icons">account_circle</i>Dashboard
          </Link>
        </li>
        <li>
          <Link to="/addbooks">
            <i className="material-icons">file_upload</i>Upload Book
          </Link>
        </li>
        <li>
          <Link to="/books"><i className="material-icons">book</i>Books
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i className="material-icons">person</i>Profile
          </Link>
        </li>
        <li>
          <a onClick={this.logout.bind(this)} id="logOut">
            <i className="material-icons">fast_rewind</i>Log Out
          </a>
        </li>
      </div>
    );

    const userLinks = (
      <div>
        <li name="library">
          <Link to="/library">
            <i className="material-icons">book</i>Library
          </Link>
        </li>
        <li name="history">
          <Link to="/history"><i className="material-icons">photo_library</i>
          History
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i className="material-icons">person</i>Profile
          </Link>
        </li>
        <li name="logout">
          <a onClick={this.logout.bind(this)} id="logOut">
            <i className="material-icons">fast_rewind</i>Log Out
          </a>
        </li>
      </div>
    );
    return (
      <div className="container-fluid">
        <ul id="slide-out" className="side-nav fixed">
          <li>
            <div className="user-view">
              <a to="#" className="brand-logo">HelloBooks</a>
              <div className="background"></div>
              <a href="#!user">
                <img className="circle"
                  src={image}
                />
              </a>
              <a href="#!name">
                <span className="white-text name">
                  {`${this.state.firstname} ${this.state.lastname}`}
                </span>
              </a>
              <a href="#!email"><span className="white-text email">
                {this.state.email}</span>
              </a>
            </div>
          </li>
          {
            localStorage.username === 'admin96'
            && isAuthenticated ?
            adminLinks : userLinks }
        </ul>
        <a to="#" data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
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
    auth: state.auth,
    usersId: state.auth.user.id,
    getUserData: state.getUser[0].response,
  };
}

export default connect(mapStateToProps, {
  logout,
  getUserDataRequest
})(withRouter(NavigationBar));
