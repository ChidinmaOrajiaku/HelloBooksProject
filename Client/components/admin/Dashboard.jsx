import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import {
  adminCountBooksRequest,
  adminCountRentedBooksRequest,
  adminCountNotReturnedBooksRequest,
  adminCountCategoryRequest,
  adminCreateCategoryRequest
} from '../../actions/booksAction';
import { adminCountUserRequest } from '../../actions/adminCountUsers';

/**
 * @class Dashboard
 */
export class Dashboard extends React.Component {
  /**
     * @constructor
     * @param {object} props
     */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      booksData: '',
      rentedBooksData: '',
      usersCountData: '',
      categoryCountData: '',
      category: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  /**
   *
   * @returns {object} mounted components
   * @memberof Dashboard
   */
  componentDidMount() {
    this.props.adminCountBooksRequest();
    this.props.adminCountRentedBooksRequest();
    this.props.adminCountUserRequest();
    this.props.adminCountNotReturnedBooksRequest();
    this.props.adminCountCategoryRequest();
    $('.modal').modal({
      dismissible: true,
      opacity: 0.5,
      inDuration: 300,
      outDuration: 200,
      startingTop: '2%',
      endingTop: '20%',
    });
  }

  /**
   *
   * @returns {nextProps} next props
   * @param {any} nextProps
   * @memberof Dashboard
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.booksData[0].bookCount) {
      this.setState({
        booksData: nextProps.booksData[0].bookCount,
      });
    }
    if (nextProps.booksData[0].rentedBookCount) {
      this.setState({
        rentedBooksData: nextProps.booksData[0].rentedBookCount,
      });
    }
    if (nextProps.booksData[0].categoryCount) {
      this.setState({
        categoryCountData: nextProps.booksData[0].categoryCount,
      });
    }
    if (nextProps.usersCountData[0]) {
      this.setState({
        usersCountData: nextProps.usersCountData[0].adminCountUsers,
      });
    }
  }

  /**
 *
 * @param {any} event
 * @memberof AddBooks
 * @returns {object} SyntheticEvent
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
 *
 * @returns {event} handles category change
 * @param {any} event
 * @memberof Dashboard
 */
  handleCategory(event) {
    event.preventDefault();
    this.props.adminCreateCategoryRequest(this.state);
    setTimeout(() => {
      if (this.props.booksData[0].isCreated === true) {
        Materialize.toast('Successfully Added', 2000, 'teal rounded');
      } else {
        Materialize.toast('Not Created', 2000, 'red rounded');
      }
    }, 2000);
  }

  /**
   *
   *
   * @memberof Dashboard
   * @returns {object} ReactMarkupElement
   */
  render() {
    return (
      <div className="adminDashboard ">
        <div className="container row">
          <div className=""> <NavigationBar /> </div>
          <h4 className="col s12 m9 offset-m6 offset-s2 white-text"> DASHBOARD </h4>
          <div className="row initial">
            <div className="col s12 m6 pull-s3">
              <div className="card">
                <div className="card-content text-center teal-text">
                  <span className="card-title text-center">Total Books</span>
                  <p>{this.state.booksData}</p>
                </div>
                <div className="card-action">
                </div>
              </div>
            </div>
            <div className="col s12 m6 pull-s3 black-text">
              <div className="card">
                <div className="card-content text-center teal-text">
                  <span className="card-title text-center">Total Borrowed Books
                  </span>
                  <p>{this.state.rentedBooksData}</p>
                </div>
                <div className="card-action">
                </div>
              </div>
            </div>
            <div className="col s12 m6 pull-s3">
              <div className="card">
                <div className="card-content teal-text text-center">
                  <span className="card-title text-center">Total Users</span>
                  <p>{ this.state.usersCountData }</p>
                </div>
                <div className="card-action">

                </div>
              </div>
            </div>
            <div className="col s12 m6 pull-s3">
              <div className="card">
                <div className="card-content teal-text text-center">
                  <span className="card-title text-center">Total Category</span>
                  <p>{ this.state.categoryCountData }</p>
                </div>
                <div className="card-action">
                  <a href="#modal1" className="modal-trigger white-text">Create</a>
                </div>
              </div>
            </div>
            <div id="modal1" className="modal">
              <div className="modal-content">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      value={this.state.category}
                      onChange={this.handleChange}
                      id="category" type="text"
                      className="validate"
                      required="required"
                    />
                    <label htmlFor="category">Category</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={this.handleCategory}
                    type="submit"
                    className="createButton">Create</button>
                  <a className="modal-action modal-close">
                    <button
                    className="cancelButton"
                    id="cancelButton">Cancel
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div> <Footer /></div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => (
  {
    booksData: state.books,
    usersCountData: state.userState,
    createCategory: state.books
  }
);

export default connect(
  mapStateToProps,
  {
    adminCountBooksRequest,
    adminCountRentedBooksRequest,
    adminCountUserRequest,
    adminCountNotReturnedBooksRequest,
    adminCreateCategoryRequest,
    adminCountCategoryRequest
  }
)(Dashboard);
