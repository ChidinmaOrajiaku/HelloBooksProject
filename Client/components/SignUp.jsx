import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BodyNavigationBar from './BodyNavigationBar';
import Footer from './Footer';
import { userSignupRequest } from '../actions/signupAction';

/**
 *
 *
 * @class SignUp
 * @extends {React.Component}
 */
export class SignUp extends React.Component {
  /**
   * Creates an instance of SignUp.
   * @constructor
   * @param {any} props
   * @memberof SignUp
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      errors: false,
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  /**
 * @returns {object} response object
 * @param {any} event
 * @memberof SignUp
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Handles sign up action
   * @returns {object} response object
   * @param {any} event
   * @memberof SignUp
   */
  onSignupSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state).then(() => {
      setTimeout(() => {
        if (this.props.usersId.isAuthenticated === true) {
          this.props.history.push('/profile');
        } else if (this.props.signUpResponse.isSignedUp === false) {
          Materialize.toast(this.props.signUpResponse.error.response.data, 2000, 'red rounded');
        }
      }, 1000);
    });
  }

  /**
   * React Element Markup
   * @returns {object} response object
   * @memberof SignUp
   */
  render() {
    return (
      <div className="signUp">
        <div className="bodyNavigation"> <BodyNavigationBar /> </div>
        <div className="row container">
          <div className="col s12 m6 offset-m3">
            <div className="card" data-aos="flip-left">
              <div className="card-content black-text">
                <form
                  onSubmit={this.onSignupSubmit}
                  id="form">
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        value={this.state.firstname}
                        onChange={this.handleChange}
                        id="firstname"
                        required="required"
                        type="text"
                        className="validate"
                      />
                      <label htmlFor="firstname">First Name</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        value={this.state.lastname}
                        onChange={this.handleChange}
                        id="lastname"
                        required="required"
                        type="text"
                        className="validate"
                      />
                      <label htmlFor="lastname">Last Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.username}
                        onChange={this.handleChange}
                        id="username"
                        required="required"
                        type="text"
                        className="validate"
                      />
                      <label htmlFor="username">User Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.password}
                        onChange={this.handleChange}
                        id="password"
                        required="required"
                        type="password"
                        className="validate"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.email}
                        onChange={this.handleChange}
                        id="email"
                        required="required"
                        type="email"
                        className="validate"/>
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action">
                    Sign Up
                    <i className="material-icons right">send</i>
                  </button>
                </form>
              </div>
              <div className="account">
                <p> I already have an account?
                  <Link to="/login"> Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export const mapStateToProps = state => (
  {
    usersId: state.auth,
    signUpResponse: state.signUp[0],
  }
);

export default connect(mapStateToProps, { userSignupRequest })(SignUp);
