import React from 'react';

/**
 * 
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
     * 
     * React Element Markup
     * @returns {object} response object
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
