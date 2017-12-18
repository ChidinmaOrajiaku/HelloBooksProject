import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { getUserDataRequest } from '../../actions/getUser';
import { updatePassword } from '../../actions/updatePassword';

/**
 * @class Profile
 */
class Profile extends React.Component {
  /**
     * @constructor
     * @param {object} props 
     */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      errors: false,
      message: this.props.passwordUpdate,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  /**
   * 
   * @returns {object} response object
   * @memberof Profile
   */
  componentDidMount() {
    this.props.getUserDataRequest(this.props.usersId);
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
   * Receives next props and sets it in state
   * @returns {object} response object
   * @param {any} nextProps 
   * @memberof Profile
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.getUserData) {
      this.setState({
        firstname: nextProps.getUserData.firstname,
        lastname: nextProps.getUserData.lastname,
        email: nextProps.getUserData.email,
        username: nextProps.getUserData.username
      });
    }
  }

  /**
 * Handles input field change and sets the state
 * @returns {object} response object
 * @param {event} event 
 * @memberof Profile
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Updates user password
   * @returns {object} response object
   * @param {event} event
   * @memberof Profile
   */
  handlePassword(event) {
    event.preventDefault();
    this.props.updatePassword(this.props.usersId, this.state);
    setTimeout(() => {
      if (this.props.passwordUpdate.isUpdated === true) {
        Materialize.toast('Successfully Updated', 2000, 'teal rounded');
      } else {
        Materialize.toast('Password Incorrect', 2000, 'red rounded');
      }
    }, 1000);
  }

  /**
     * 
     * React Element Markup
     * @returns {object} response object
     * @memberof Profile
     */
  render() {
    return (
      <div className="profile row">
        <div className=""> <NavigationBar /> </div>
        <h4 className="col m9 offset-m2"> PROFILE DETAILS</h4>
        <hr className="col m3 offset-m5"></hr>
        <div className="row">
          <div className="col m3 offset-m5 profileB">
            <div className="card">
              <div className="card-content">
                <p className="profileDetails">
                  Name: {`${this.state.firstname} ${this.state.lastname}`}</p>
                <p className="profileDetails"> Username: {this.state.username}</p>
                <p className="profileDetails"> Email: {this.state.email}</p>
                <p className="profileDetails"> Password: ***
                  <a className="modal-trigger" href="#modal1">
                    <button className="material-icons">create</button>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="input-field col s12">
                <input value={this.state.verifyPassword}
                  onChange={this.handleChange} id="verifyPassword" required="required"
                  type="password" className="validate"/>
                <label htmlFor="verifyPassword">Old Password</label>
              </div>
              <div className="input-field col s12">
                <input value={this.state.password}
                  onChange={this.handleChange} id="password" required="required"
                  type="password" className="validate"/>
                <label htmlFor="password">New Password</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={this.handlePassword}
              className="passwordButton"> Change </button>
            <a className="modal-action modal-close">
              <button className="passwordCButton">Cancel</button>
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
    usersId: state.auth.user.id,
    getUserData: state.getUser[0].response,
    passwordUpdate: state.updatePassword[0]
  }
);

export default connect(mapStateToProps, { getUserDataRequest, updatePassword })(Profile);
