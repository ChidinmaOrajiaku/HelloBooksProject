import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import NavigationBar from '../NavigationBar';
import axios from 'axios';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/booksAction';

/**
 * @class Dashboard
 */
class Dashboard extends React.Component {
  /**
     * @constructor
     * @param {object} props 
     */
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * @constructor
   * @param {object} render
   */
  render() {
    return (
      <div className="adminDashboard container">
        <div className=""> <NavigationBar /> </div>
        <div className="row initial">
          <div className="col s6 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text text-center">
                <span className="card-title text-center">Amount of Books in Library</span>
                <p>12</p>
              </div>
              <div className="card-action">
                <a href="/library">View</a>
              </div>
            </div>
          </div>
          <div className="col s6 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text text-center">
                <span className="card-title text-center">Amount of Books in Library</span>
                <p>12</p>
              </div>
              <div className="card-action">
                <a href="/library">View</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row second">
          <div className="col s6 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text text-center">
                <span className="card-title text-center">Amount of Books in Library</span>
                <p>12</p>
              </div>
              <div className="card-action">
                <a href="/library">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
};

export default connect(null, { })(Dashboard);
