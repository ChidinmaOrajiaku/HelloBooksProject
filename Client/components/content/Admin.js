import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import axios from 'axios';
import { connect } from 'react-redux';
import { adminAddRequest } from '../../actions/booksAction';
import { adminDeleteRequest } from '../../actions/booksAction';
import * as bookActions from '../../actions/booksAction';

class Admin extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      category: '',
      image: '',
      review: '',
      key: '',
      data: [],
      errors: false,
      success: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.onAddSubmit = this.onAddSubmit.bind(this);
    this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
  }

   componentWillMount() {
    axios.get('/api/v1/users/books').then((res) => {
      localStorage.getItem('jwtToken');
      this.setState({ data: res.data})
    });
   };
   
  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }
 

  onAddSubmit(event) {
    event.preventDefault();
    this.props.adminAddRequest(this.state).then(
    //   (success) => { 
    //     console.log(success.response)
    //     // Materialize.toast(success.data.message, 2000, 'teal rounded')
    //     this.setState( {success: success.response }) 
    //   },
    //   (errors) =>{
    //     Materialize.toast(errors.response.data, 2000, 'red accent-3 rounded')
    //  this.setState({ errors: errors.response.data  })
    //   }
    )
    // this.componentDidUpdate;
  }
  
  onDeleteSubmit(event) {
    event.preventDefault();
    this.props.deleteBooks(this.props.params.id);
      console.log(this.props.params.id)
  }



  componentDidMount() {
    $('.modal').modal({
      dismissible: true, 
      opacity: .5, 
      inDuration: 300, 
      outDuration: 200,
      startingTop: '4%', 
      endingTop: '10%',
    });
  } 

  render() {
    const { data } = this.state
    const { adminAddRequest } = this.props
    const { adminDeleteRequest } = this.props
    const { errors, success } = this.state
  return (
      <div className="admin">
         <h1> Welcome Admin </h1> <br/> <h3> What would you like to do? </h3> 
         <div className="row">
              <div className="card col m2 offset-m1">
                <div className="card-image">
                  <img src="https://librarianofalexandria.files.wordpress.com/2013/04/plussign.png"/>
                  <span> <a className="waves-effect waves-light modal-trigger" href="#modal1">Add Books</a> </span>
                  <div className="card">
                     <div id="modal1" className="modal">
                           <form onSubmit={this.onAddSubmit} id="form">
                           <div className="row">
                             <div className="input-field col s12">
                               <input value={this.state.title} onChange={this.handleChange} id="title" type="text" className="validate"/>
                                <label htmlFor="title">Title</label>
                             </div>
                            </div>
                            <div className="row">
                             <div className="input-field col s12">
                               <input value={this.state.author} onChange={this.handleChange} id="author" type="text" className="validate"/>
                                <label htmlFor="author">Author</label>
                             </div>
                            </div>
                            <div className="row">
                             <div className="input-field col s12">
                               <input value={this.state.category} onChange={this.handleChange} id="category" type="text" className="validate"/>
                                <label htmlFor="category">Category</label>
                             </div>
                            </div>
                            <div className="row">
                             <div className="input-field col s12">
                               <input value={this.state.image} onChange={this.handleChange} id="image" type="text" className="validate"/>
                                <label htmlFor="image">Image</label>
                             </div>
                            </div>
                            <div className="row">
                             <div className="input-field col s12">
                             <textarea value={this.state.review} onChange={this.handleChange} id="review" className="materialize-textarea"></textarea>
                                <label htmlFor="review">Review</label>
                             </div>
                            </div>
                            <button className="btn waves-effect waves-light" type="submit" name="action">Add<i className="material-icons right">send</i></button>
                          </form>
                         </div>
                     </div>
                 </div> 
             </div>
             <div className="card col m2 two">
                <div className="card-image">
                  <img src="http://img.freepik.com/free-icon/delete-cross_318-79863.jpg?size=338&ext=jpg"/>
                  <span> Delete User </span>
                 </div> 
             </div>
             <div className="card col m2 three">
                <div className="card-image">
                  <img src="https://image.freepik.com/free-vector/writting-pencil-design_1095-187.jpg"/>
                  <span> View Users </span>
                 </div> 
             </div>
             <div className="card col m2 three">
                <div className="card-image">
                  <img src="https://dreamfeel.files.wordpress.com/2010/01/pastas.png"/>
                  <span className="category"> Create Category </span>
                 </div> 
             </div>
          </div>
          <div>
            <hr/>
            <div className=" tableau col s12 m6">
              <div className="card">
              <table className="bordered highlight">
                <thead>
                   <tr>
                      <th>Title</th>
                       <th>Author</th>
                      <th>Category</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Modify</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.data.map (
                          books => 
                          <tr key = { books.id }>
                          <td> {books.title} </td>
                          <td> {books.author} </td>
                          <td> {books.category} </td>
                          <td> {books.created} </td>
                          <td> {books.updated} </td>
                          <td> <button className="btn waves-effect waves-light" type="submit" name="action">Modify</button> </td>
                          <td> <button className="btn waves-effect waves-light" type="submit" name="action" key={ this.state.data.findIndex(numbers => numbers.id === books.id) } onClick={this.onDeleteSubmit}>Delete</button> </td>
                          </tr>
                        )
                      }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
  );
}
};

Admin.propTypes = {
  adminAddRequest: PropTypes.func.isRequired,
  adminDeleteRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books
  };
  console.log(state.books)
};
// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    // This dispatch will trigger 
    // the Ajax request we setup
    // in our actions
    deleteBooks: bookId => dispatch(bookActions.deleteBooks(bookId))
  };
};

export default connect((mapStateToProps, mapDispatchToProps), { adminAddRequest, adminDeleteRequest } ) (Admin);