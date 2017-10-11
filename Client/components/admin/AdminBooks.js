import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { getRequest } from '../../actions/getAllBooks';
import { adminModifyRequest } from '../../actions/modifyBooks';
import { adminDeleteRequest } from '../../actions/deleteBooks';
import { admingetBorrowedRequest } from '../../actions/getAllBorrowedBooks';
import { getBookRequest } from '../../actions/getABook';


/**
 * @class Books
 */
class Books extends React.Component {
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
    this.handleDeleteChange = this.handleDeleteChange.bind(this);
  }
  /**
 * 
 * @returns {event} handles change
 * @param {any} event 
 * @memberof Books
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  /**
 * 
 * @returns {event} handles change
 * @param {any} event 
 * @memberof Books
 */
  handleDeleteChange(event) {
    this.setState({ bookId: event.target.value, bookIndex: event.target.dataset.index });
  }
  /**
 * 
 * @returns {event} view a book request
 * @param {any} event 
 * @memberof Books
 */
  onViewRequest(event) {
    event.preventDefault();
    this.props.getBookRequest(event.target.value);
  }
  /**
 * 
 * @returns {event} delete a book request
 * @param {any} event 
 * @memberof Books
 */
  onDeleteRequest(event) {
    event.preventDefault();
    this.props.adminDeleteRequest(this.state.bookId).then(() => {
      this.state.filterData.splice(this.state.bookIndex, 1);
      this.setState({
        getAllBooks: this.state.filterData
      });
      Materialize.toast('Successfully deleted', 2000, 'teal rounded');
    }
    );
  }
  /**
   * 
   * @returns {nextProps} next props
   * @param {any} nextProps 
   * @memberof Books
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
   * @returns {props} actions
   * @memberof Books
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
     * 
     * @constructor 
     * @memberof Books
     */
  render() {
    const books = this.state.loading ? <div><p>Loading...</p></div> :
      <table className="bordered centered responsive-table">
        <thead>
          <tr className="teal-text">
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
              <td><button value={this.state.getAllBooks[key].id} onClick={this.onViewRequest} className="material-icons">zoom_in</button><button value={this.state.getAllBooks[key].id} onClick={this.onViewRequest} className="material-icons">create</button><a href="#modal1" className="modal-trigger"><button value={this.state.getAllBooks[key].id} onClick={this.handleDeleteChange} data-index= {key} className="material-icons">delete</button></a></td>
            </tr>
          )}
        </tbody>
      </table>;
    const borrowedBooks = this.state.loading ? <div><p>Loading...</p></div> :
      <table className="bordered centered responsive-table">
        <thead>
          <tr className="teal-text">
            <th> Image </th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(this.state.getAllBorrowedBooks).map(key =>
            <tr key={key}>
              <td> <img src = {this.state.getAllBorrowedBooks[key].Book.image }/> </td>
              <td>{ this.state.getAllBorrowedBooks[key].Book.title }</td>
              <td>{ this.state.getAllBorrowedBooks[key].Book.author }</td>
              <td>{ this.state.getAllBorrowedBooks[key].Book.category }</td>
            </tr>
          )}
        </tbody>
      </table>;
    return (
      <div className="books row ontainer">
        <div className=""> <NavigationBar /> </div>
        <div className="row col m8 offset-m3">
          <div className="input-field col s4">
            {<select className="teal-text" id= "bookStatus"value="1" onChange={this.handleChange}>
              <option value="" defaultValue>Choose your option</option>
              <option value="2">All Books</option>
              <option value="3">Pending Returns</option>
            </select>}
            <label className="teal-text">Select View</label>
          </div>
          <div className="col s12 ">
            <div className="card">
              <div className="card-content white-text">
                {this.state.bookStatus === '3' ? borrowedBooks : books }
              </div>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <p className="white-text modalDelete">Are you you want to delete this book?</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.onDeleteRequest} className="deleteButton"> Delete </button>
            <a className="modal-action modal-close"><button className="cancelButton">Cancel</button></a>
          </div>
        </div>
        <div> <Footer/></div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    getAllBooksData: state.getAllBooks[0].response,
    getAllBorrowedBooksData: state.getAllBorrowedBooks[0].response,
    getABookData: state.getABook[0].response,
    modifyBookData: state.modifyBooks[0].response,
    deleteBookData: state.deleteBooks[0].response
  }
);

export default connect(mapStateToProps,
  { adminModifyRequest, adminDeleteRequest, admingetBorrowedRequest, getRequest, getBookRequest })(Books);
