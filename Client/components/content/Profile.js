import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { getUserDataRequest } from '../../actions/getUser';

/**
 * @class AddBooks
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
    };
  }

  /**
   * 
   * @returns {any} data
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
   * 
   * @returns {nextProps} next props
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
     * 
     * 
     * @returns {ReactElement} MarkUp
     * @memberof AddBooks
     */
  render() {
    return (
      <div className="profile row">
        <div className=""> <NavigationBar /> </div>
        <h4 className="col m8 offset-m5"> PROFILE DETAILS</h4>
        <div className="row">
          <div className="col m3 offset-m5 profileB">
            <div className="">
              <div className="card-image">
                <img className="profileImg" src="https://cdn-images-1.medium.com/fit/c/200/200/1*P8ve1Obc8tLIyWgwlx1E8A.jpeg"/>
              </div>
              <div className="card-content">
                <hr></hr>
                <p className="profileDetails"> Name: {`${this.state.firstname} ${this.state.lastname}`}</p>
                <p className="profileDetails"> Username: {this.state.username}</p>
                <p className="profileDetails"> Email: {this.state.email}</p>
                <p className="profileDetails"> Password: *** <a className="modal-trigger" href="#modal1"><button className="material-icons">create</button></a></p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={this.onAddSubmit} id="form">
          <div id="modal1" className="modal">
            <div className="modal-content">
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.password} onChange={this.handleChange} id="password" required="required" type="password" className="validate"/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Change</a>
              <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
          </div>
        </form>
        <div> <Footer/></div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    usersId: state.auth.user.id,
    getUserData: state.getUser[0].response,
  }
);

export default connect(mapStateToProps, { getUserDataRequest })(Profile);
