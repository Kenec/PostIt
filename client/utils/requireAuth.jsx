/* global localStorage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
// import { verifyToken } from '../actions/signinActions';
/**
 * export default - component for Authenticate to disallow unauthenticated
 * user from accessing certain routes
 * @function 
 * @param  {DOM} ComposedComponent the component to be protected
 * @return {DOM}                   returns the protected component and its props
 */
export default function (ComposedComponent) {
  /**
   * @class Authenticate
   */
  class Authenticate extends Component {
    /**
     * @constructor
     * @param {*} props 
     */
    constructor(props) {
      super(props);
      this.state = {
        expiredToken: null
      };
    }
    /**
     * @function componentWillMount
     * @return {void}
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
     * @function componentDidMount
     * @return {void}
     */
    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    /**
     * @function componentWillUpdate
     * @param {Props} nextProps
     * @return {void}
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    /**
     * @function isTokenExpired
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
     * @function render
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
   * @function mapStateToProps
   * @param {object} state
   * @return {object} state object 
  */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.userLogin.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
