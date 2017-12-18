import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BodyNavigationBar from './BodyNavigationBar';
import { userSigninRequest } from '../actions/signinAction';

/**
 * @class SignIn
 * @extends {React.Component}
 */
export class SignIn extends React.Component {
  /**
   * Creates an instance of SignIn.
   * @param {any} props 
   * @memberof SignIn
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      active: 'First',
      errors: false,
      success: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSigninSubmit = this.onSigninSubmit.bind(this);
  }

  /**
 * 
 * @returns {object} response object
 * @param {any} event 
 * @memberof SignIn
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
 * 
 * @returns {object} response object
 * @param {event} event 
 * @memberof SignIn
 */
  onSigninSubmit(event) {
    event.preventDefault();
    this.props.userSigninRequest(this.state).then(
      () => {
        this.context.router.history.push('/profile');
      },
      (errors) => {
        Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded');
        this.setState({ errors: errors.response.data.message });
      }
    );
  }
  /**
 * React Element Markup
 * @returns {object} response object
 * @memberof SignIn
 */
  render() {
    return (
      <div className="signIn">
        <div className="bodyNavigation"> <BodyNavigationBar /> </div>
        <div className="row container">
          <div className="col m6 offset-m3">
            <div className="card" data-aos="flip-up">
              <div className="card-content black-text">
                <form
                  onSubmit={this.onSigninSubmit}
                  id="form">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.email}
                        onChange={this.handleChange} id="email"
                        required="required" type="email" className="validate"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        value={this.state.password}
                        onChange={this.handleChange} id="password"
                        required="required"
                        type="password"
                        className="validate"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action">Sign In
                    <i className="material-icons right">send</i>
                  </button>
                </form>
              </div>
              <div className="account">
                <p> Not a member?
                  <Link to="/register">
                  Sign Up
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

SignIn.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

SignIn.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { userSigninRequest })(SignIn);
