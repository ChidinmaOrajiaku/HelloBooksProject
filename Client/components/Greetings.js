import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupAction';

class Greetings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstname : '',
      lastname : '',
      username: '',
      password: '',
      email: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state)
  }
  componentDidMount() {
    var options = [
      {selector: '.quotes', offset: 50, callback: function(el) {
        Materialize.fadeInImage($(el));
      } },
      {selector: '.card', offset: 50, callback: function(el) {
        Materialize.fadeInImage($(el));
      } }
    ];
    Materialize.scrollFire(options);
    } 

  render() {
    const {userSignUpRequest}=this.props
  return (
    <div className="main">
       <div className=" container row ">
           <div className="quotes">
             <h1 className="books">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”</h1>
              <h2 className="author"> ~Jane Austen, Northanger Abbey</h2>
           </div> 
            <div className="card col m6 offset-m3">
             <div className="card-tabs">
               <ul className="tabs tabs-fixed-width teal-text">
                 <li className="tab col s6"><a href="#signup">Sign Up</a></li>
                  <li className="tab col s6"><a href="#signin">Sign In</a></li>
               </ul>
             </div>
             <div className="card-content">
               {/* Sign Up */}
                <div id="signup" className="col s12">
                 <form onSubmit={this.onSubmit}>
                   <div className="row">
                     <div className="input-field col s6">
                        <input value={this.state.firstname} onChange={this.handleChange} id="firstname" type="text"  required="required" className="validate"/>
                          <label htmlFor="firstname">First Name</label>
                     </div>
                     <div className="input-field col s6">
                        <input value={this.state.lastname} onChange={this.handleChange} required="required" id="lastname" type="text" className="validate"/>
                         <label htmlFor="lastname">Last Name</label>
                     </div>
                   </div>
                   <div className="row">
                      <div className="input-field col s12">
                        <input value={this.state.username} onChange={this.handleChange} required="required" id="username" type="text" className="validate"/>
                          <label htmlFor="username">User Name</label>
                     </div>
                   </div>
                   <div className="row">
                      <div className="input-field col s12">
                        <input value={this.state.password} onChange={this.handleChange} required="required" id="password" type="password" className="validate"/>
                         <label htmlFor="password">Password</label>
                     </div>
                   </div>
                   <div className="row">
                     <div className="input-field col s12">
                       <input value={this.state.email} onChange={this.handleChange} required="required" id="email" type="email" className="validate"/>
                        <label htmlFor="email">Email</label>
                     </div>
                   </div>
                   <button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">send</i></button>
                 </form>
               </div>
               <div id="signin" className="col s12">
                  <form onSubmit={this.onSubmit}>
                     <div className="row">
                        <div className="input-field col s12">
                          <input value={this.state.username} onChange={this.handleChange} required="required" id="username" type="text" className="validate"/>
                            <label htmlFor="username">User Name</label>
                       </div>
                     </div>
                      <div className="row">
                         <div className="input-field col s12">
                           <input value={this.state.password} onChange={this.handleChange} required="required" id="password" type="password" className="validate"/>
                            <label htmlFor="password">Password</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <input value={this.state.email} onChange={this.handleChange} required="required" id="email" type="email" className="validate"/>
                           <label htmlFor="email">Email</label>
                        </div>
                      </div>
                      <button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">send</i></button>
                   </form>
                 </div>
                </div>
            </div>
         </div>
    </div>
    );
 };
}

Greetings.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}
export default connect(null, { userSignupRequest }) (Greetings);
