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
class Library extends React.Component {
  /**
     * @constructor
     * @param {object} props 
     */
  constructor(props) {
    super(props);
    this.state = {
      getAllBooks: [],
      loading: true,
    };
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
    });
  }
  /**
   * 
   * @returns {event} SyntheticEvent
   * @param {any} event 
   * @memberof Books
   */
  handlePassword(event) {
    event.preventDefault();
    this.props.borrowRequest(this.props.usersId, this.state).then(
      () => {
        Materialize.toast('Loading', 1000, 'red rounded');
        setTimeout(() => {
          Materialize.toast(this.props.getBorrowedBookData, 2000, 'teal rounded');
        }, 1000);
      }
    );
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
      <div className=" lib row">
        { Object.keys(this.state.getAllBooks).map(key =>
          <div className="col s12 m4 push-m2">
            <div className="card" key={key}>
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={this.state.getAllBooks[key].image }/>
              </div>
              <div className="card-content">
                <span className="card-title activator teal-text text-darken-3">{ this.state.getAllBooks[key].title }<i className="material-icons right">more_vert</i></span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">Book Details<i className="material-icons right">close</i></span>
                <p> <b className="teal-text text-darken-3">Title:</b> { this.state.getAllBooks[key].title }</p>
                <p> <b className="teal-text text-darken-3">Author</b>: { this.state.getAllBooks[key].author }</p>
                <p> <b className="teal-text text-darken-3">Category</b>: { this.state.getAllBooks[key].category }</p>
                <p> <b className="teal-text text-darken-3">Review</b>: { this.state.getAllBooks[key].review }</p>
                <a className="waves-effect waves-light btn borrowButton"> Borrow </a>
              </div>
            </div>
          </div>
        )}
      </div>;
    return (
      <div className="library row container">
        <div> <NavigationBar /> </div>
        <h4 className="col m10 offset-m2"> USER LIBRARY </h4>
        {books}
        <div> <Footer/></div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    usersId: state.auth.user.id,
    getAllBooksData: state.getAllBooks[0].response,
    getAllBorrowedBooksData: state.getAllBorrowedBooks[0].response,
    getBorrowedBookData: state.borrowBooks[0].response || state.borrowBooks[0].error
  }
);

export default connect(mapStateToProps,
  { getRequest, borrowRequest })(Library);
