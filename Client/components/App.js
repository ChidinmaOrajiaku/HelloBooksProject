import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import Greetings from './Greetings';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                < NavigationBar />
               {this.props.children}
            </div>
        );
    };
}

export default App;