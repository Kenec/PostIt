import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * export default - component for Authenticate to disallow unauthenticated
 * user from accessing certain routes
 *
 * @param  {type} ComposedComponent description
 * @return {type}                   description
 */
export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount () {
      if(!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate (nextProps) {
      if(!nextProps.isAuthenticated){
        this.context.router.push('/');
      }
    }

    render(){
      return(
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state){
    return {
      isAuthenticated: state.userLoginReducer.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
