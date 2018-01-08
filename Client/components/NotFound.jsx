import React from 'react';
import BodyNavigationBar from './BodyNavigationBar';
import Footer from './Footer';
import notFound from '../img/notfound.gif';

export default () => (
  <div>
    <div className=""> <BodyNavigationBar /> </div>
    <div className="notFound">
      <div className="container">
        <div className="card">
          <h1>404</h1>
          <img src={notFound}/>
          <h2>Page Not Found</h2>
        </div>
      </div>
      <div> <Footer /></div>
    </div>
  </div>
);
