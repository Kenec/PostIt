import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from '../actions/signinActions';
/**
 * export default - component for Authenticate to disallow unauthenticated
 * user from accessing certain routes
 *
 * @param  {DOM} ComposedComponent the component to be protected
 * @return {DOM}                   returns the protected component and its props
 */
export default function (ComposedComponent) {
  /**
   * @class Authenticate
   */
  class Authenticate extends Component {
    /**
     * @return {void}
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    /**
     * @return {void}
     */
    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    /**
     * 
     * @param {Props} nextProps
     * @return {void}
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    /**
     * @return {DOM} DOM Component
     */
    render() {
      if (!this.props.isAuthenticated) {
        return null;
      }
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    isLoggedIn: React.PropTypes.func.isRequired,
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  /**
 * 
 * @param {object} state
 * @return {object} state object 
 */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.userLogin.isAuthenticated,
    };
  }

  return connect(mapStateToProps, { isLoggedIn })(Authenticate);
}
