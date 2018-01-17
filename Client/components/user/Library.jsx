import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { getRequest } from '../../actions/getAllBooks';
import { borrowRequest } from '../../actions/borrowBooks';


/**
 * @class Books
 */
export class Library extends React.Component {
  /**
     * @constructor
     * @param {object} props
     */
  constructor(props) {
    super(props);
    this.state = {
      getAllBooks: [],
      loading: true,
      bookId: ''
    };
    this.handleBorrow = this.handleBorrow.bind(this);
  }

  /**
   *
   * @returns {object} response object
   * @memberof Library
   */
  componentDidMount() {
    this.props.getRequest();
    $('select').material_select();
    $('select').change(event => this.handleChange(event));
    $('.tooltipped').tooltip();
  }

  /**
   * Receives next props an sets the state
   * @returns {object} response object
   * @param {nextProps} nextProps
   * @memberof Library
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false,
      getAllBooks: nextProps.getAllBooksData,
    });
  }

  /**
   * Handles borrow books action
   * @returns {object} response object
   * @param {event} event
   * @memberof Books
   */
  handleBorrow(event) {
    event.preventDefault();
    localStorage.setItem('bookId', event.target.value);
    this.setState({
      bookId: localStorage.getItem('bookId')
    }),
    setTimeout(() => {
      this.props.borrowRequest(this.props.usersId, this.state);
    });
    setTimeout(() => {
      if (this.props.borrowBooksData.response.message === 'Borrowing limit has been reached') {
        Materialize.toast('Borrowing limit has been reached', 2000, 'red rounded');
      } else if (this.props.borrowBooksData.response.message === 'Book has been borrowed but not returned') {
        Materialize.toast('Book has been borrowed but not returned', 2000, 'red rounded');
      } else if (this.props.borrowBooksData.hasBorrowed === true) {
        Materialize.toast('Successfully Borrowed', 2000, 'teal rounded');
      } else {
        Materialize.toast('Not Borrowed', 2000, 'red rounded');
      }
    }, 1000);
  }

  /**
     *
     * React element mark up
     * @returns {object} response object
     * @memberof Library
     */
  render() {
    const books = this.state.loading ? <div><p>Loading...</p></div> :
      <div className="lib row">
        { Object.keys(this.state.getAllBooks).map(key =>
          <div className="col s12 m4 push-m2 push-s2" key={key}>
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator"
                  src={this.state.getAllBooks[key].image }
                />
              </div>
              <div className="card-content">
                <span className="card-title activator teal-text text-darken-3">
                  { this.state.getAllBooks[key].title }
                  <i
                    className="material-icons right tooltipped"
                    data-position="bottom"
                    data-delay="50"
                    data-tooltip="More.."
                  >
                more_vert</i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Book Details<i className="material-icons right">close</i>
                </span>
                <p> <b className="teal-text text-darken-3">Title:
                </b> { this.state.getAllBooks[key].title }</p>
                <p> <b className="teal-text text-darken-3">Author</b>:
                  { this.state.getAllBooks[key].author }</p>
                <p> <b className="teal-text text-darken-3">Category</b>:
                  { this.state.getAllBooks[key].category }</p>
                <p> <b className="teal-text text-darken-3">Review</b>:
                  { this.state.getAllBooks[key].review }</p>
                <button
                  className="waves-effect waves-light btn borrowButton"
                  id="libraryAction"
                  value={ this.state.getAllBooks[key].id }
                  onClick={this.handleBorrow}>Borrow </button>
              </div>
            </div>
          </div>)}
      </div>;

    return (
      <div className="library row">
        <div className="container">
          <div> <NavigationBar /> </div>
          <h4 className="col s12 m10 offset-m2 white-text"> USER LIBRARY </h4>
          {books}
          <div> <Footer /></div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => (
  {
    usersId: state.auth.user.id,
    getAllBooksData: state.getAllBooks[0].response,
    borrowBooksData: state.borrowBooks[0]
  }
);

export default connect(
  mapStateToProps,
  { getRequest, borrowRequest }
)(Library);
