import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import BodyNavigationBar from './BodyNavigationBar';
import Footer from './Footer';
import img1 from '../img/smiley1.jpg';
import img2 from '../img/smiley2.jpg';
import img3 from '../img/smiley3.jpg';
import img4 from '../img/sidney1.jpg';
import img5 from '../img/sideny2.jpeg';
import img6 from '../img/sidney3.jpg';
import img7 from '../img/sidney4.jpg';
import img8 from '../img/sidney5.jpg';
import img9 from '../img/sidney6.jpg';

export default () => (
  <div className="main">
    <div className="bodyNavigation"> <BodyNavigationBar /> </div>
    <div className="row">
      <div className="container first-section">
        <h1 className="welcome">
          Welcome to Hello Books
        </h1>
        <div>
          <Link to="/login"
            className="waves-effect waves-light btn col s2 offset-m3 "> Login
          </Link>
          <Link className="waves-effect waves-light btn col s2 offset-m1"
            to="/register"> Sign Up </Link>
        </div>
      </div>
      <div className="second-section">
        <div className="row">
          <div className="col s4" data-aos="zoom-in">
            <div>
              <h1>
                <img src={img1} data-aos="flip-left" />
                <br/>
            Read a book
              </h1>
              <span>
          Hi Reader! Looking for a book to read? You are in the right place.
          Just sign up with your awesome details and begin a wonderful book sail.
              </span>
            </div>
          </div>
          <div className="col s4" data-aos="zoom-in">
            <h1>
              <img src={img2} data-aos="flip-right" />
              <br/>
            Borrow a book
            </h1>
            <span>
          You can decide to borrow a book a save it for later.
          Yeah! It's your library, use it however you like.
          Just remember to return the borrowed books within the stipulated time.
            </span>
          </div>
          <div className="col s4" data-aos="zoom-in">
            <h1>
              <img src={img3} data-aos="flip-left"/>
              <br/>
            Suggest a book
            </h1>
            <span>
          Do you have any book you would love to read but is not available on our app?
          Or  have you read all available books and in need something new?
          Just suggest it to us and you'll get it in no time. Rememeber, your wish is our command.
            </span>
          </div>
        </div>
      </div>
      <div className="third-section">
        <div className="row container">
          <span className="col s12" data-aos="fade-up">Popular books</span>
          <div className="col s4" data-aos="fade-up">
            <img src={img4}/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src={img5}/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src={img6}/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src={img7}/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src={img8}/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src={img9}/>
          </div>
        </div>
      </div>
    </div>
    <div> <Footer /></div>
  </div>
);

