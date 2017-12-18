import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { getRequest } from '../../actions/getAllBooks';
import { adminDeleteRequest } from '../../actions/deleteBooks';
import { admingetBorrowedRequest } from '../../actions/getAllBorrowedBooks';
import { getBookRequest } from '../../actions/getABook';
import { editBookIdRequest } from '../../actions/editBooks';


/**
 * @class Books
 */
class AdminBooks extends React.Component {
  /**
     * @constructor
     * @param {object} props 
     */
  constructor(props) {
    super(props);
    this.state = {
      bookId: '',
      bookIndex: '',
      deleteBook: '',
      filterData: [],
      getABook: [],
      getAllBooks: [],
      getAllBorrowedBooks: [],
      bookStatus: '',
      loading: true,
      pointer: false,
    };
    this.onViewRequest = this.onViewRequest.bind(this);
    this.onDeleteRequest = this.onDeleteRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleDeleteChange = this.handleDeleteChange.bind(this);
  }

  /**
   * 
   * @returns {object} response object
   * @memberof AdminBooks
   */
  componentDidMount() {
    this.props.getRequest();
    this.props.admingetBorrowedRequest();
    $('select').material_select();
    $('select').change(event => this.handleChange(event));
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
   * @memberof AdminBooks
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false,
      getAllBooks: nextProps.getAllBooksData,
      filterData: nextProps.getAllBooksData,
      getAllBorrowedBooks: nextProps.getAllBorrowedBooksData,
      getABook: nextProps.getABookData,
      deleteBook: nextProps.deleteBookData,
      modifyBook: nextProps.modifyBookData
    });
  }

  /**
 * 
 * @returns {event} handles change
 * @param {any} event 
 * @memberof AdminBooks
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
 * 
 * @returns {event} handles delete change
 * @param {any} event 
 * @memberof AdminBooks
 */
  handleDeleteChange(event) {
    this.setState({
      bookId: event.target.value,
      bookIndex: event.target.dataset.index });
  }

  /**
 * 
 * @returns {event} handles edit change
 * @param {any} event 
 * @memberof AdminBooks
 */
  handleEditChange(event) {
    event.persist();
    this.props.editBookIdRequest(event.target.value);
    localStorage.setItem('currentBookId', event.target.value);
  }
  /**
 * 
 * @returns {event} view a book request
 * @param {any} event 
 * @memberof AdminBooks
 */
  onViewRequest(event) {
    event.preventDefault();
    this.props.getBookRequest(event.target.value);
  }
  /**
 * 
 * @returns {event} delete a book request
 * @param {any} event 
 * @memberof AdminBooks
 */
  onDeleteRequest(event) {
    event.preventDefault();
    this.props.adminDeleteRequest(this.state.bookId);
    setTimeout(() => {
      if (this.props.deleteBookData.isDeleted === true) {
        this.state.filterData.splice(this.state.bookIndex, 1);
        this.setState({
          getAllBooks: this.state.filterData
        });
        this.props.history.push('/books');
        Materialize.toast('Successfully deleted', 2000, 'teal rounded');
      } else {
        Materialize.toast('Not Deleted', 2000, 'red rounded');
      }
    }, 1000);
  }
  /**
     * 
     * 
     * @returns {object} ReactMarkupElement 
     * @memberof AdminBooks
     */
  render() {
    const books = this.state.loading ? <div><p>Loading...</p></div> :
      <table className="bordered centered responsive-table">
        <thead>
          <tr className="white-text">
            <th> Image </th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(this.state.getAllBooks).map(key =>
            <tr key={key}>
              <td> <img src = {this.state.getAllBooks[key].image }/> </td>
              <td>{ this.state.getAllBooks[key].title }</td>
              <td>{ this.state.getAllBooks[key].author }</td>
              <td>{ this.state.getAllBooks[key].category }</td>
              <td>
                <Link to="/editbook">
                  <button
                    value={this.state.getAllBooks[key].id}
                    onClick={this.handleEditChange}
                    data-index= {key}
                    className="material-icons">create
                  </button>
                </Link>
                <a href="#modal1" className="modal-trigger">
                  <button
                    value={this.state.getAllBooks[key].id}
                    onClick={this.handleDeleteChange}
                    data-index= {key}
                    className="material-icons">delete
                  </button>
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>;
    const borrowedBooks = this.state.loading ? <div><p>Loading...</p></div> :
      <table className="bordered centered responsive-table">
        <thead>
          <tr className="white-text">
            <th> Image </th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(this.state.getAllBorrowedBooks).map(key =>
            <tr key={key}>
              <td>
                <img src = {this.state.getAllBorrowedBooks[key].Book.image }/>
              </td>
              <td>{ this.state.getAllBorrowedBooks[key].Book.title }</td>
              <td>{ this.state.getAllBorrowedBooks[key].Book.author }</td>
              <td>{ this.state.getAllBorrowedBooks[key].Book.category }</td>
            </tr>
          )}
        </tbody>
      </table>;

    return (
      <div className="books row container-fluid">
        <div> <NavigationBar /> </div>
        <h4 className="col m8 offset-m3 white-text"> ADMIN BOOK LIST </h4>
        <div className="row col m8 offset-m3">
          <div className="input-field col s4 status">
            <select
              className="white-text"
              id= "bookStatus"
              value="1"
              onChange={this.handleChange}>
              <option value="" defaultValue>Choose your option</option>
              <option value="2">All Books</option>
              <option value="3">Pending Returns</option>
            </select>
            <label className="white-text sort">Sort table</label>
          </div>
          <div className="col s12 ">
            <div className="card">
              <div className="card-content teal-text">
                {this.state.bookStatus === '3' ? borrowedBooks : books }
              </div>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <p className="white-text modalDelete">
              Are you you want to delete this book?
            </p>
          </div>
          <div className="modal-footer">
            <button
              onClick={this.onDeleteRequest}
              className="deleteButton"> Delete
            </button>
            <a className="modal-action modal-close">
              <button className="cancelButton">Cancel
              </button>
            </a>
          </div>
        </div>
        <div> <Footer /></div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    getAllBooksData: state.getAllBooks[0].response,
    getAllBorrowedBooksData: state.getAllBorrowedBooks[0].response,
    getABookData: state.getABook[0].response,
    deleteBookData: state.deleteBooks[0]
  }
);

export default connect(mapStateToProps,
  { adminDeleteRequest, admingetBorrowedRequest, getRequest, getBookRequest, editBookIdRequest
  })(AdminBooks);
