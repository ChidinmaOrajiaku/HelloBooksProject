import React, { Component } from 'react';

/**
 *
 *
 * @export
 * @param {object} Component
 * @returns {object} component
 */
export default function (Component) {
/**
 * @class Navigattion
 * @extends {React.Component}
 */
  class Navigation extends React.Component {
    /**
     *
     *
     * @returns {object} response object
     * @memberof Navigation
     */
    componentWillMount() {
      if (localStorage.jwtToken) {
        return this.props.history.push('/profile');
      }
      return this.props.history.push('/');
    }

    /**
     * React Element Markup
     * @returns {object} response object
     * @memberof App
     */
    render() {
      return (
      <Component {...this.props}/>
      );
    }
  }
  return Navigation;
}
