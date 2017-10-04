import React from 'react';
import PropTypes from 'prop-types';
import {  connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authenticate extends React.Component {
       
        componentWillMount() {
            if (!this.props.isAuthenticated){
                Materialize.toast(' Please login to access this page ', 2000, 'red accent-3 rounded');
                this.props.history.push('/login')
            }
        }
        
        componentWillUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                this.props/history.push('/')
            }
        }

        render() {
            return (
              <ComposedComponent {...this.props} />
            );
        }
    }
    return Authenticate;

    Authenticate.PropTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    }   

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
return connect(mapStateToProps)(Authenticate);
}
