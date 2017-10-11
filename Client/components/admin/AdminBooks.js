import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { getRequest } from '../../actions/getAllBooks';
import { adminModifyRequest } from '../../actions/modifyBooks';
import { adminDeleteRequest } from '../../actions/deleteBooks';

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
      getAllBooks: '',
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
      getAllBooks: nextProps.getAllBooksData
    });
  }
  /**
   * 
   * @returns {props} actions
   * @memberof Books
   */
  componentDidMount() {
    this.props.getRequest();
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
          { this.state.getAllBooks.map((book, i) =>
            <tr key={i}>
              <td> <img src = {book.image }/> </td>
              <td>{ book.title }</td>
              <td>{ book.author }</td>
              <td>{ book.category }</td>
            </tr>
          )}
        </tbody>
      </table>;
    return (
      <div className="books row ontainer">
        <div className=""> <NavigationBar /> </div>
        <div className="row col m8 offset-m3">
          <div className="input-field col s4">
            <select className="teal-text" id= "bookStatus"value="1" onChange={this.handleChange}>
              <option value="" defaultValue>Choose your option</option>
              <option value="2">All Books</option>
              <option value="3">Pending Returns</option>
            </select>
            <label className="teal-text">Select View</label>
          </div>
          <div className="col s12 ">
            <div className="card">
              <div className="card-content white-text">
                {books}
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
    getAllBooksData: state.getAllBooks[0].response
  }
);

export default connect(mapStateToProps,
  { adminModifyRequest, adminDeleteRequest, getRequest })(Books);
