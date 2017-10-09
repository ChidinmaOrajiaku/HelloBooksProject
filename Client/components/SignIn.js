import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import Footer from './Footer';
import BodyNavigationBar from './BodyNavigationBar';
import { connect } from 'react-redux';
import { userSigninRequest } from '../actions/signinAction';

/**
 * 
 * 
 * @class SignIn
 * @extends {React.Component}
 */
class SignIn extends React.Component {
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
 * 
 * @param {any} event 
 * @memberof SignIn
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
 * 
 * 
 * @param {any} event 
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
 * 
 * 
 * @returns 
 * @memberof SignIn
 */
  render() {
    const { userSigninRequest } = this.props;
    const { errors, success } = this.state;
    return (
      <div className="signIn">
        <div className="bodyNavigation"> <BodyNavigationBar /> </div>
        <div className="row container">
          <div className="quotes">
            <h1 className="books">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”</h1>
            <h2 className="author"> ~Jane Austen, Northanger Abbey</h2>
          </div>
          <div className="col m6 offset-m3">
            <div className="card">
              <div className="card-content black-text">
                <form onSubmit={this.onSigninSubmit} id="form">
                  <div className="row">
                    <div className="input-field col s12">
                      <input value={this.state.username} onChange={this.handleChange} id="username" required="required" type="text" className="validate"/>
                      <label htmlFor="username">User Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input value={this.state.password} onChange={this.handleChange} id="password" required="required" type="password" className="validate"/>
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input value={this.state.email} onChange={this.handleChange} id="email" required="required" type="email" className="validate"/>
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <button className="btn waves-effect waves-light" type="submit" name="action">Sign In
                    <i className="material-icons right">send</i>
                  </button>
                </form>
              </div>
              <div className="account">
                <p> Not a member? <a href="/register"> Sign Up </a> </p>
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
