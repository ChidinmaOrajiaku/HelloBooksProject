import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import axios from 'axios';
import { connect } from 'react-redux';

class Admin extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      category: '',
      data: []
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.onSigninSubmit = this.onSigninSubmit.bind(this);
  }

   componentWillMount() {
    axios.get('/api/v1/users/books').then((res) => {
      localStorage.getItem('jwtToken');
      this.setState({ data: res.data})
      console.log(this.state.data);
    });
   };
   
  // handleChange(event) {
  //   this.setState({[event.target.id]: event.target.value})
  // }
 

  onSubmit(event) {
    event.preventDefault();
    // this.props.userSigninRequest(this.state).then(
    //   () => { 
    //     this.context.router.history.push('/library')
    //   },
    //   (errors) =>{
    //     Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded')
    //  this.setState({ errors: errors.response.data.message })
    //   }
    // )
  }

  render() {
    $(document).ready(function(){
      $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%',
      });
    });
    const { data } = this.state
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
                           <form>
                           <div className="row">
                             <div className="input-field col s12">
                               <input id="title" type="text" className="validate"/>
                                <label htmlFor="title">Title</label>
                             </div>
                            </div>
                            <div className="row">
                             <div className="input-field col s12">
                               <input id="author" type="text" className="validate"/>
                                <label htmlFor="author">Author</label>
                             </div>
                            </div>
                            <div clasNames="row">
                             <div className="input-field col s12">
                               <input id="category" type="text" className="validate"/>
                                <label htmlFor="category">Category</label>
                             </div>
                            </div>
                            <div className="row">
                             <div className="input-field col s12">
                               <input id="image" type="text" className="validate"/>
                                <label htmlFor="image">Image</label>
                             </div>
                            </div>
                            <div className="row">
                             <div className="input-field col s12">
                               <input id="review" type="text" className="validate"/>
                                <label htmlFor="review">Review</label>
                             </div>
                            </div>
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
            <div className=" col s12 m6">
              <div className="card">
              <table>
                <thead className="bordered">
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
                          <tr>
                          <td> {books.title} </td>
                          <td> {books.author} </td>
                          <td> {books.category} </td>
                          <td> {books.created} </td>
                          <td> {books.updated} </td>
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

// SignIn.propTypes = {
//   userSigninRequest: PropTypes.func.isRequired
// }

// SignIn.contextTypes = {
//   router: PropTypes.object.isRequired
// }

export default connect(null,) (Admin);