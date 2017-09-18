import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { store } from '../../index';
import { getRequest } from '../../actions/booksAction';

class History extends React.Component {
 
  constructor (props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  componentWillMount() {
    console.log(store)
      const user = store.getState()
      const userId = user.auth.user.id
      axios.get('/api/v1/users/' + userId + '/history').then((res) => {
        localStorage.getItem('jwtToken');
        this.setState({ data: res.data})
      });
   };
   
  render() {
  $(document).ready(function(){
    $('ul.tabs').tabs({
      swipeable : true,
      responsiveThreshold : 1920
    });
  });
  return (
    <div className="history">
    <table className="bordered highlight centered container">
    <thead>
      <tr>
          <th>Title</th>
          <th>Returned</th>
          <th>To Return Date</th>
          <th>Returned Date</th>
      </tr>
    </thead>

    <tbody>
    {
       this.state.data.map (
        history => 
      <tr>
        <td><div className = "row valign-wrapper"><img src={history.image}/> <p>{history.title} <br/> {history.author}</p></div></td>
        <td>{`${history.returned}`}</td>
        <td>{history.toReturnDate}</td>
        <td>{history.returnDate}</td>
      </tr>
       )
    }
    </tbody>
  </table>
  </div>
  );
};
}


export default connect(null,) (History);
