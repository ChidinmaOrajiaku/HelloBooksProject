import React from 'react';
import BodyNavigationBar from './BodyNavigationBar';
import Footer from '../Footer';

class AppContent extends React.Component {
    render() {
        return (
            <div className="container-fluid">
               <BodyNavigationBar />
               {this.props.children}
            </div>
        );
    };
}

export default AppContent;