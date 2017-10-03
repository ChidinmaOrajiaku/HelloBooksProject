import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from '../../index';
import { postProfileRequest, updatePasswordRequest, updateProfileRequest } from '../../actions/profileAction';
import { putBookRequest } from '../../actions/booksAction';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userId: (store.getState()).auth.user.id,
      // sort out
      profileResponse: (store.getState()).userState[0],
      image: '',
      description: '',
      status: '',
      interest: '',
      password: '',
      gender: '',
      data: [],
      profile: [],
      books: [],
      popular: [],
      success: false,
      errors: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.onProfileSubmit = this.onProfileSubmit.bind(this);
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    this.onReturnBooks = this.onReturnBooks.bind(this);
    this.onProfileUpdate = this.onProfileUpdate.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }

  onProfileSubmit(event) {
    event.preventDefault();
    this.props.postProfileRequest(this.state.userId, this.state).then(
      () => {Materialize.toast(this.state.profileResponse, 2000, 'teal rounded')},
      (errors) =>{
        Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded')
     this.setState({ errors: errors.response.data.message  })
      }
    )
  }

  onPasswordSubmit(event) {
    event.preventDefault();
    this.props.updatePasswordRequest(this.state.userId, this.state).then(
      () => { 
        Materialize.toast(this.state.profileResponse, 2000, 'teal rounded')
      },
      (errors) =>{
        Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded')
     this.setState({ errors: errors.response.data.message  })
      }
    )
    console.log((store.getState()).userState[0])
  }

  onProfileUpdate(event) {
    event.preventDefault();
    this.props.updateProfileRequest(this.state.userId, this.state).then(
      () => { 
        Materialize.toast(this.state.profileResponse, 2000, 'teal rounded')
      },
      (errors) =>{
        Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded')
     this.setState({ errors: errors.response.data.message  })
      }
    )
  }

  onReturnBooks(event) {
    event.preventDefault();
    this.props.putBookRequest(this.state.userId, event.target.value).then(
      () => { 
        Materialize.toast(this.state.profileResponse, 2000, 'teal rounded')
      },
      (errors) =>{
        Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded')
     this.setState({ errors: errors.response.data.message  })
      }
    )
  }

  componentWillMount() {
    axios.get('/api/v1/users/' + this.state.userId).then((res) => {
      localStorage.getItem('jwtToken');
      this.setState({ data: res.data})
    });
    axios.get('/api/v1/users/' + this.state.userId + '/profile').then((res) => {
      localStorage.getItem('jwtToken');
      this.setState({profile: res.data})
    });
    axios.get('/api/v1/users/' + this.state.userId + '/books').then((res) => {
      localStorage.getItem('jwtToken');
      this.setState({books: res.data})
    });
    axios.get('/api/v1/users/books').then((res) => {
      localStorage.getItem('jwtToken');
      this.setState({ popular: res.data})
    });
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
    
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
      $('.scrollspy').scrollSpy()
    });

    const { postProfileRequest, updatePasswordRequest, putBookRequest } = this.props
    const user = this.state.data
    const { errors, success } = this.state
  return (
    <div className="profile">
      {this.state.profile.map ((profile, index) =>
    <div className="row"  key={index}>
      <div className="col s4 ">
        <div className="card">
          <h1 className="name"> Welcome {user.firstname}</h1>
            <div className="card-image">
              <img src={profile.image}/>
            </div>
            <div className="card-content">
            <p> Name: {user.firstname + ' ' + user.lastname} </p>
            <p> Username: { user.username }</p>
            <p> Email: { user.email} </p>
          </div>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Create Profile</a>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal2">Change Password</a>
        </div>
        </div>
        <div className="col s2 ">
           <p className="equal"> => </p>
        </div>
        <div className="col s5">
           <p className="profileData"> Description </p>
           <p className="data"> {profile.description}</p>
           <p className="profileData"> Interest </p>
           <p className="data"> {profile.interest}</p>
           <p className="profileData"> Status </p>
           <p className="data"> {profile.status}</p>
           <p className="profileData"> Gender </p>
           <p className="data"> {profile.gender}</p>
           <a className="waves-effect waves-light btn modal-trigger button3" href="#modal3">Edit Profile</a>
        </div>
        </div>
          )
          }
          <div className="row getPopularBooks">
            <hr/>
            <h1 className="return"> Popular Books </h1>
          {this.state.popular.map ((books, index) =>
               <div className="col s3 " key={index}>
                  <div className="card hoverable">
                     <div className="card-image">
                         <img id="image" value={ books.image } onChange={ this.handleChange } src= { books.image }/>
                     </div>
                  </div>
             </div>   
          )
          }
          </div>
          <div className="row getUnreadBooks">
            <hr/>
            <h1 className="return"> Unreturned Books </h1>
          {this.state.books.map ((books, index) =>
               <div className="col s3 " key={index}>
                  <div className="card hoverable">
                     <div className="card-image">
                         <img id="image" value={ books.image } onChange={ this.handleChange } src= { books.image }/>
                         <button value= { books.booksId } className="btn tooltipped btn-floating halfway-fab waves-effect waves-light teal" data-position="bottom" data-delay="50" data-tooltip="Hi! Click to return" onClick= { this.onReturnBooks } type="submit" name="action" ><i className="material-icons">add</i></button>
                     </div>
                  </div>
             </div>   
          )
          }
          </div>
        <div id="modal1" className="modal">
        <div className="modal-content">
        <div className="row">
        <div className="col s12">
        <form onSubmit={this.onProfileSubmit} id="form">
        <div className="row">
           <div className="input-field col s12">
             <input value={this.state.image} onChange={this.handleChange} id="image" required="required" type="text" className="validate"/>
               <label htmlFor="image">Image</label>
          </div>
        </div>
        <div className="row">
           <div className="input-field col s12">
             <textarea value={this.state.description} onChange={this.handleChange} id="description" required="required" type="text" className="materialize-textarea"></textarea>
              <label htmlFor="description">Description</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={this.state.status} onChange={this.handleChange} id="status" required="required" type="text" className="validate"/>
             <label htmlFor="email">Status</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={this.state.interest} onChange={this.handleChange} id="interest" required="required" type="text" className="validate"/>
             <label htmlFor="email">Interest</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={this.state.gender} onChange={this.handleChange} id="gender" required="required" type="text" className="validate"/>
             <label htmlFor="gender">Gender</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" name="action">Create<i className="material-icons right">send</i></button>
      </form>
        </div>
      </div>
      </div>
      </div>
      <div id="modal2" className="modal">
        <div className="modal-content">
          <div className="row">
            <div className="col s12">
              <form onSubmit={this.onPasswordSubmit} id="form">
                <div className="row">
                  <div className="input-field col s12">
                    <input value={this.state.password} onChange={this.handleChange} id="password" required="required" type="password" className="validate"/>
                     <label htmlFor="password">Password</label>
                 </div>
               </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Update<i className="material-icons right">send</i></button>
             </form>
           </div>
         </div>
       </div>
     </div>
     <div id="modal3" className="modal">
        <div className="modal-content">
        <div className="row">
        <div className="col s12">
        <form onSubmit={this.onProfileUpdate} id="form">
        <div className="row">
           <div className="input-field col s12">
             <textarea value={this.state.description} onChange={this.handleChange} id="description" type="text" className="materialize-textarea"></textarea>
              <label htmlFor="description">Description</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={this.state.status} onChange={this.handleChange} id="status" type="text" className="validate"/>
             <label htmlFor="email">Status</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={this.state.interest} onChange={this.handleChange} id="interest"  type="text" className="validate"/>
             <label htmlFor="email">Interest</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={this.state.gender} onChange={this.handleChange} id="gender" type="text" className="validate"/>
             <label htmlFor="gender">Gender</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" name="action">Edit<i className="material-icons right">send</i></button>
      </form>
        </div>
      </div>
      </div>
      </div>
      </div>
  );
}
};

Profile.propTypes = {
  postProfileRequest: PropTypes.func.isRequired,
  updatePasswordRequest: PropTypes.func.isRequired,
  putBookRequest: PropTypes.func.isRequired,
  updateProfileRequest: PropTypes.func.isRequired
}

export default connect(null, { postProfileRequest, updatePasswordRequest, putBookRequest, updateProfileRequest }) (Profile);
