import React from 'react';
import BodyNavigationBar from './BodyNavigationBar';

class Profile extends React.Component {
  render() {
    $(document).ready(function(){
      $('ul.tabs').tabs({
        swipeable : true,
        responsiveThreshold : 1920
      });
    });
    const styles = {
      height: '500px'
    }
  return (
    <div className="profile">
    <div className="row valign-wrapper">
      <div className="col s3">
        <img src="https://cdn-images-1.medium.com/fit/c/200/200/1*P8ve1Obc8tLIyWgwlx1E8A.jpeg"/>
        </div>
        <h1> This </h1>
      </div>
      </div>
  );
}
};

export default Profile;
