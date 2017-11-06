import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import BodyNavigationBar from './BodyNavigationBar';
import Footer from './Footer';

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
                <img src="https://i.pinimg.com/originals/9f/e5/4a/9fe54a03000b0b0d4b760b857054a5bf.jpg" data-aos="flip-left" />
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
              <img src="https://sites.google.com/a/boardmanschools.org/boardman-middle-school-libraries/_/rsrc/1415286151537/home/library3.jpg?height=322&width=400" data-aos="flip-right" />
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
              <img src="https://i.pinimg.com/736x/99/98/01/999801522789fdf8f97442e15f065cd5--books-and-coffee-i-love-coffee.jpg" data-aos="flip-left"/>
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
            <img src="http://booksandpeople.info/wp-content/uploads/2011/02/sidney_sheldon.jpeg?w=185"/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src="https://i.pinimg.com/originals/e0/3a/f8/e03af83d06e29f56c36f573f4bab30ee.jpg"/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src="https://i.pinimg.com/originals/94/28/c8/9428c887bf1bdebc8c04bfed5c7d45e2.jpg"/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src="https://images.gr-assets.com/books/1306787560l/1067.jpg"/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src="https://jrwilliamsdesign.files.wordpress.com/2014/12/front-cover-life-is-for-living.jpg"/>
          </div>
          <div className="col s4" data-aos="fade-up">
            <img src="https://covers.oreillystatic.com/images/0636920035534/lrg.jpg"/>
          </div>
        </div>
      </div>
    </div>
    <div> <Footer /></div>
  </div>
);

