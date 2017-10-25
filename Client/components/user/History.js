import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from '../NavigationBar';
import { getUserBorrowed } from '../../actions/getUserBorrowedBooks';
import { yetToReturn } from '../../actions/yetToReturn';
import { returnBook } from '../../actions/returnBook';


/**
 * 
 * 
 * @class History
 * @extends {React.Component}
 */
class History extends React.Component {
  /**
  * Creates an instance of History.
  * @param {any} props 
  * @memberof History
  */
  constructor(props) {
    super(props);
    this.state = {
      userBorrowed: [],
      yetToReturn: [],
      bookStatus: '',
      loading: true,
      booksId: '',
      filterYetData: []
    };
    this.handleReturn = this.handleReturn.bind(this);
  }
  /**
 * 
 * @returns {event} handles change
 * @param {any} event 
 * @memberof History
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  /**
 * 
 * @returns {event} handles return
 * @param {any} event 
 * @memberof History
 */
  handleReturn(event) {
    event.preventDefault();
    localStorage.setItem('booksId', event.target.value);
    this.setState({
      booksId: localStorage.getItem('booksId'),
      bookIndex: event.target.dataset.index
    }),
    setTimeout(() => {
      this.props.returnBook(this.props.usersId, this.state).then(() => {
        this.state.filterYetData.splice(this.state.bookIndex, 1);
        this.setState({
          yetToReturn: this.state.filterYetData
        });
        Materialize.toast('Succesfully Returned', 2000, 'teal rounded');
      }
      ).catch(() => {
        Materialize.toast('I dunno', 500, 'red rounded');
      });
    });
  }
  /**
 * 
 * @returns {data} data
 * @param {any} event 
 * @memberof History
 */
  componentDidMount() {
    this.props.getUserBorrowed(this.props.usersId);
    this.props.yetToReturn(this.props.usersId);
    $('select').material_select();
    $('select').change(event => this.handleChange(event));
  }

  /**
   * 
   * @returns {nextProps} next props
   * @param {any} nextProps 
   * @memberof Library
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false,
      userBorrowed: nextProps.getUserBorrowedData,
      yetToReturn: nextProps.yetToReturnData,
      filterYetData: nextProps.yetToReturnData,
    });
  }

  /**
     * 
     * 
     * @returns {ReactElement} Markup 
     * @memberof History
     */
  render() {
    const borrowedBooks = this.state.loading ? <div><p>Loading...</p></div> :
      <table className="bordered centered responsive-table">
        <thead>
          <tr className="white-text">
            <th> Image </th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th> Returned </th>
            <th> Return Date </th>
            <th> Date Returned </th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(this.state.userBorrowed).map(key =>
            <tr key={key}>
              <td> <img src = {this.state.userBorrowed[key].Book.image }/> </td>
              <td>{ this.state.userBorrowed[key].Book.title }</td>
              <td>{ this.state.userBorrowed[key].Book.author }</td>
              <td>{ this.state.userBorrowed[key].Book.category }</td>
              <td>{ this.state.userBorrowed[key].returned === false ? 'Not Returned' : 'Returned' }</td>
              <td>{ this.state.userBorrowed[key].toReturnDate === null ? 'N/A' : this.state.userBorrowed[key].toReturnDate }</td>
              <td>{ this.state.userBorrowed[key].returnDate === null ? 'N/A' : this.state.userBorrowed[key].returnDate }</td>
            </tr>
          )}
        </tbody>
      </table>;
    const yetToReturnBooks = this.state.loading ? <div><p>Loading...</p></div> :
      <table className="bordered centered responsive-table">
        <thead>
          <tr className="white-text">
            <th> Image </th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th> Return </th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(this.state.yetToReturn).map(key =>
            <tr key={key}>
              <td> <img src = {this.state.yetToReturn[key].Book.image }/> </td>
              <td>{ this.state.yetToReturn[key].Book.title }</td>
              <td>{ this.state.yetToReturn[key].Book.author }</td>
              <td>{ this.state.yetToReturn[key].Book.category }</td>
              <td><button value={this.state.yetToReturn[key].booksId} onClick={this.handleReturn} data-index= {key} className="waves-effect waves-light btn">Return</button></td>
            </tr>
          )}
        </tbody>
      </table>;
    return (
      <div className="history row container-fluid">
        <div className=""> <NavigationBar /> </div>
        <h4 className="col m8 offset-m3"> USER BOOK HISTORY </h4>
        <div className="row col m8 offset-m3">
          <div className="input-field col s4 status">
            <select className="teal-text" id= "bookStatus"value="1" onChange={this.handleChange}>
              <option value="" defaultValue>Choose your option</option>
              <option value="2">Borrowed Books</option>
              <option value="3">Pending Returns</option>
            </select>
            <label className="black-text sort">Sort table</label>
          </div>
          <div className="col s12 ">
            <div className="">
              <div className="card-content teal-text">
                {this.state.bookStatus === '3' ? yetToReturnBooks : borrowedBooks }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    usersId: state.auth.user.id,
    getUserBorrowedData: state.userBorrowedBooks[0].response,
    yetToReturnData: state.yetToReturn[0].response,
  }
);

export default connect(mapStateToProps, { yetToReturn, getUserBorrowed, returnBook })(History);
