import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { getRequest } from '../../actions/getAllBooks';
import { adminModifyRequest } from '../../actions/modifyBooks';
import { adminDeleteRequest } from '../../actions/deleteBooks';
import { admingetBorrowedRequest } from '../../actions/getAllBorrowedBooks';


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
      getAllBooks: [],
      getAllBorrowedBooks: [],
      bookStatus: '',
      loading: true,
      pointer: false,
    };
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
   * @returns {nextProps} next props
   * @param {any} nextProps 
   * @memberof Books
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false,
      getAllBooks: nextProps.getAllBooksData,
      getAllBorrowedBooks: nextProps.getAllBorrowedBooksData
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
    $('.tooltipped').tooltip({ delay: 50 });
    $('select').material_select();
    $('select').change(event => this.handleChange(event));
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
              <td><i className="material-icons">zoom_in</i><i className="material-icons">create</i><i className="material-icons">delete</i></td>
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
        <div> <Footer/></div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    getAllBooksData: state.getAllBooks[0].response,
    getAllBorrowedBooksData: state.getAllBorrowedBooks[0].response
  }
);

export default connect(mapStateToProps,
  { adminModifyRequest, adminDeleteRequest, admingetBorrowedRequest, getRequest })(Books);
