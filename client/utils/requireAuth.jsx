/* global localStorage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

/**
 * export default - component for Authenticate to disallow unauthenticated
 * user from accessing certain routes
 * @function 
 * @param  {DOM} ComposedComponent the component to be protected
 * @return {DOM} returns the protected component and its props
 */
export default function (ComposedComponent) {
  /**
   * Protect other component from unauthenticated users
   * @class Authenticate
   * @extends {Component}
   */
  class Authenticate extends Component {
    /**
     * Creates an instance of Authenticate
     * @constructor
     * @param {any} props 
     * @memberof Authenticate 
     */
    constructor(props) {
      super(props);
      this.state = {
        expiredToken: null
      };
    }

    /**
     * Life Cycle method to be called before a component mounts
     * @method componentWillMount
     * @return {void} void
     */
    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
      if (token) {
        if (this.isTokenExpired() === true) {
          this.setState({ expiredToken: true });
          localStorage.removeItem('jwtToken');
          this.context.router.push('/');
        }
      }
    }

    /**
     * Life cycle method to be called after a component mounts
     * @method componentDidMount
     * @return {void} void
     */
    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    /**
     * Life cycle method to be called before a component updates
     * @method componentWillUpdate
     * @param {Props} nextProps
     * @return {void}
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    /**
     * Check is token has expired
     * @method isTokenExpired
     * @return {void} 
     */
    isTokenExpired() {
      const token = jwt.decode(localStorage.getItem('jwtToken'));
      const date = token.exp;
      this.setState({
        expiredToken: date < Date.now() / 1000,
      });
      return date < Date.now() / 1000;
    }

    /**
     * Display the DOM Component
     * @method render
     * @return {DOM} DOM Component
     */
    render() {
      if (!this.props.isAuthenticated || this.state.expiredToken === true) {
        return null;
      }
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  /**
   * Map state to props
   * @function mapStateToProps
   * @param {any} state
   * @return {object} state object
   */
  const mapStateToProps = state => (
    {
      isAuthenticated: state.userLogin.isAuthenticated,
    }
  );

  return connect(mapStateToProps)(Authenticate);
}
