import React from 'react';
import Footer from './Footer';
import Greetings from './Greetings';

/**
 * 
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
     * 
     * 
     * @returns 
     * @memberof App
     */
  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

export default App;
