import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { connect } from 'react-redux';
import { adminCountBooksRequest, adminCountRentedBooksRequest } from '../../actions/booksAction';
import { adminCountUserRequest } from '../../actions/profileAction';

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
      loading: true,
      booksData: 0,
      rentedBooksData: 0,
      usersCountData: 0,
    };
  }

  /**
   * 
   * @constructor
   * @memberof Dashboard
   */
  componentDidMount() {
    this.props.adminCountBooksRequest().then(
      this.setState({
        booksData:localStorage.getItem('countBooks')
      })
    );
    this.props.adminCountRentedBooksRequest().then(
      this.setState({
        rentedBooksData:localStorage.getItem('countRentedBooks')
      })
    );
    this.props.adminCountUserRequest().then(
      this.setState({
        usersCountData:localStorage.getItem('countUsers')
      })
    );
  }

  /**
   * 
   * 
   * @param {any} nextProps 
   * @memberof Dashboard
   */

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
            <div className="card">
              <div className="card-content text-center teal-text">
                <span className="card-title text-center">Total Books</span>
                <p>{this.state.booksData}</p>
              </div>
              <div className="card-action">
                <a href="/library" className="cardAction">View</a>
              </div>
            </div>
          </div>
          <div className="col s6 m6 black-text">
            <div className="card">
              <div className="card-content text-center teal-text">
                <span className="card-title text-center">Total Borrowed Books</span>
                <p>{this.state.rentedBooksData}</p>
              </div>
              <div className="card-action">
                <a className="cardAction" href="/library">View</a>
              </div>
            </div>
          </div>
          <div className="col s6 m6">
            <div className="card">
              <div className="card-content teal-text text-center">
                <span className="card-title text-center">Total Users</span>
                <p>{ this.state.usersCountData }</p>
              </div>
              <div className="card-action">
                <a className="cardAction" href="/history">View</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row second">

        </div>
        <div> <Footer/></div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    booksData: state.books.books,
    rentedBooksData: state.books.rentedBooks,
    usersCountData: state.userState.adminCountUsers
  }
);

export default connect(mapStateToProps, { adminCountBooksRequest, adminCountRentedBooksRequest, adminCountUserRequest })(Dashboard);
