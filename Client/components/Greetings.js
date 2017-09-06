import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupAction';
import { userSigninRequest } from '../actions/signinAction';

class Greetings extends React.Component {
  
  render() {
  return (
    <div className="main">
       <div className=" container row ">
           <div className="quotes">
             <h1 className="books">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”</h1>
              <h2 className="author"> ~Jane Austen, Northanger Abbey</h2>
           </div>
                <a className="waves-effect waves-light btn col s2 offset-m3 " href="/login"> Login </a>
               <a className="waves-effect waves-light btn col s2 offset-m1" href="/register"> Sign Up </a>
            </div>
            <div className="footer"> <Footer /> </div>
         </div>
    );
 };
}

export default (Greetings);
