import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * 
 * 
 * @export
 * @param {ComposedComponent } ComposedComponent 
 * @returns {object} response object
 */
export default function (ComposedComponent) {
  /**
     * 
     * 
     * @class RequireAuth
     * @extends {React.Component}
     */
  class RequireAuth extends React.Component {
    /**
       * 
       * 
       * @returns {object} response object
       * @memberof RequireAuth
       */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        Materialize.toast(' Please login to access this page ',
          2000, 'red accent-3 rounded');
        return this.props.history.push('/login');
      }
    }

    /**
     * 
     * @returns {object} response object
     * @param {any} nextProps 
     * @memberof RequireAuth
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    /**
 * 
 * 
 * @returns {object} response object
 * @memberof RequireAuth
 */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  RequireAuth.PropTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
  };

  RequireAuth.contextTypes = {
    router: PropTypes.object.isRequired
  };

  /**
   * 
   * 
   * @param {any} state 
   * @returns {object} response object
   */
  function mapStateToProps(state) {
    return {
      data: state.auth,
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  return connect(mapStateToProps, '')(RequireAuth);
}
