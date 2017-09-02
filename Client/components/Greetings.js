import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import SignUp from './SignUp';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupAction';
import { userSigninRequest } from '../actions/signinAction';

class Greetings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstname : '',
      lastname : '',
      username: '',
      password: '',
      email: '',
      value:'select',
      errors: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.onSigninSubmit = this.onSigninSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }

  onSignupSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state).then(
      () => {},
      (errors) =>{
        console.log(errors.response.data);
     this.setState({ errors: errors.response.data  })
      }
    )
  }

  onSigninSubmit(event) {
    event.preventDefault();
    this.props.userSigninRequest(this.state).then(
      () => {},
      (errors) =>{
        console.log(errors.response.data);
     this.setState({ errors: errors.response.data  })
      }
    )
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
    $('ul.tabs').tabs();
    $('select').material_select();
    } 

  render() {
    const {userSignUpRequest, userSigninRequest}=this.props
    const { errors } = this.state
  return (
    <div className="main">
       <div className=" container row ">
           <div className="quotes">
             <h1 className="books">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”</h1>
              <h2 className="author"> ~Jane Austen, Northanger Abbey</h2>
           </div> 
           <div >
             <SignUp/>
            </div>
            {/* <div className="card col m6 offset-m3">
             <div className="card-tabs">
               <ul className="tabs tabs-fixed-width teal-text">
                 <li className="tab col s6"><a href="#signup">Sign Up</a></li>
                  <li className="tab col s6 "><a className="active" href="#signin">Sign In</a></li>
               </ul>
             </div>
             <div className="card-content">
               
               {errors && <span>{errors.message}</span>}
               <div id="signin" className="col s12">
                  <form onSubmit={this.onSigninSubmit}>
                     <div className="row">
                        <div className="input-field col s12">
                          <input value={this.state.username} onChange={this.handleChange}  id="username" type="text" className="validate"/>
                            <label htmlFor="username">User Name</label>
                       </div>
                     </div>
                      <div className="row">
                         <div className="input-field col s12">
                           <input onChange={this.handleChange}  id="password" type="password" className="validate"/>
                            <label htmlFor="password">Password</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <input value={this.state.email} onChange={this.handleChange}  id="email" type="email" className="validate"/>
                           <label htmlFor="email">Email</label>
                        </div>
                      </div>
                      <button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">send</i></button>
                   </form>
                   <h4> Not a Member? <a href="#signup"> Sign up</a></h4>
                 </div>
                </div>
            </div> */}
         </div>
    </div>
    );
 };
}

Greetings.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  userSigninRequest: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.errors
  }
}
export default connect(null, { userSignupRequest, userSigninRequest }) (Greetings);
