import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
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
      (success) => { 
        Materialize.toast(success.data.message, 2000, 'teal rounded')
        this.setState( {success: success.data.message }) },
      (errors) =>{
        Materialize.toast(errors.response.data, 2000, 'red accent-3 rounded')
     this.setState({ errors: errors.response.data  })
      }
    )
  }

  render() {
    const { userSignupRequest } = this.props
    const { errors, success } = this.state
  return (
    <div className="signUp">
      <div className="row container">
        <div className="quotes">
             <h1 className="books">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”</h1>
              <h2 className="author"> ~Jane Austen, Northanger Abbey</h2>
           </div> 
  <div className="col m6 offset-m3">
    <div className="card">
    <div className="card-content black-text">
    <form onSubmit={this.onSignupSubmit} id="form">
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
    <p> I already have an account? <a href="/login"> Login </a> </p> 
</div>
 </div>
 </div>
 </div>
 <div className="footer"> <Footer /> </div>
 </div>
  );
}
};

SignUp.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest}) (SignUp);