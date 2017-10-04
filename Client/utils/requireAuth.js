import React from 'react';
import PropTypes from 'prop-types';
import {  connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(ComposedComponent) {
    class Authenticate extends React.Component {
       
        componentWillMount() {
            if (!this.props.isAuthenticated){
                Materialize.toast(' Please login to access this page ', 2000, 'red accent-3 rounded');
                return this.props.history.push('/login')
            }
            else {
                return this.props.history.push('/profile')
            }
        }

        componentWillMount(){
            console.log(this.prop)
          
        }
        
        componentWillUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                this.props.history.push('/')
            }
        }

        // componentWillReceiveProps(nextProps){
        //     console.log(nextProps.data);
        //     console.log('898888');
        //     console.log(nextProps.isAuthenticated);
        // }

        render() {
            return (
              <ComposedComponent {...this.props} />
            );
        }
    }
    return Authenticate;

    Authenticate.PropTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        data: PropTypes.object.isRequired
    }   
    
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

function mapStateToProps(state) {
    return {
        data: state.auth,
        isAuthenticated: state.auth.isAuthenticated
    }
}
return connect(mapStateToProps, '')(Authenticate);
}
