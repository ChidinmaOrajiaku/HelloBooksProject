import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupAction';

class SignUp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstname : '',
      lastname : '',
      username: '',
      password: '',
      email: '',
      value:'select',
      errors: false,
      success: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }

  onSignupSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state).then(
      (success) => { this.setState( {success: success.data.message }) },
      (errors) =>{
     this.setState({ errors: errors.response.data  })
      }
    )
  }

  render() {
    const { userSignupRequest } = this.props
    const { errors, success } = this.state
  return (
      <div className="row container signUp">
  <div className="col m8 offset-m4">
    <div className="card">
    <div className="card-content black-text">
    <form onSubmit={this.onSignupSubmit} id="form">
    {errors && <span className="errors col s12">{ errors }</span>}
    {success && <span className="errors col s12">{ success }</span>}
    <div className="row">
     <div className="input-field col s6">
        <input value={this.state.firstname} onChange={this.handleChange} id="firstname" required="required" type="text"  className="validate"/>
          <label htmlFor="firstname">First Name</label>
     </div>
     <div className="input-field col s6">
        <input value={this.state.lastname} onChange={this.handleChange} id="lastname" required="required" type="text" className="validate"/>
         <label htmlFor="lastname">Last Name</label>
     </div>
   </div>
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
   <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up
<i className="material-icons right">send</i>
</button>
 </form>
 </div>
 <div className="account">
    <a> I already have an account </a>
</div>
 </div>
 </div>
 </div>
  );
}
};

SignUp.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest}) (SignUp);