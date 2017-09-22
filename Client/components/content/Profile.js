import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from '../../index';
import { postProfileRequest } from '../../actions/profileAction';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userId: (store.getState()).auth.user.id,
      image: '',
      description: '',
      status: '',
      interest: '',
      password: '',
      gender: '',
      data: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.onProfileSubmit = this.onProfileSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }

  onProfileSubmit(event) {
     const user = store.getState()
      const userId = user.auth.user.id
    event.preventDefault();
    this.props.postProfileRequest(this.state).then(
      (errors) =>{
        Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded')
     this.setState({ errors: errors.response.data.message })
      }
    )
  }

  // onProfileSubmit(event) {
  //   event.preventDefault();
  //   this.props.postProfileRequest(this.state.userId, this.state).then(
  //     (errors) =>{
  //       Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded')
  //    this.setState({ errors: errors.response.data.message })
  //     }
  //   )
  // }

  componentWillMount() {
    axios.get('/api/v1/users/' + this.state.userId).then((res) => {
      localStorage.getItem('jwtToken');
      this.setState({ data: res.data})
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
    const { postProfileRequest } = this.props
    const user = this.state.data
  return (
    <div className="profile">
    <div className="row">
      <div className="col s4 ">
        <div className="card">
          <h1 className="name"> Welcome Chidinma</h1>
            <div className="card-image">
              <img src="https://cdn-images-1.medium.com/fit/c/200/200/1*P8ve1Obc8tLIyWgwlx1E8A.jpeg"/>
            </div>
            <div className="card-content">
            <p> Name: {user.firstname + ' ' + user.lastname} </p>
            <p> Username: { user.username }</p>
            <p> Email: { user.email} </p>
          </div>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Edit Profile</a>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal2">Change Password</a>
        </div>
        </div>
        <div className="col s6 ">
           <p className="equal"> => </p>
        </div>
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
      </div>
  );
}
};

Profile.propTypes = {
  postProfileRequest: PropTypes.func.isRequired
}

export default connect(null, { postProfileRequest }) (Profile);
