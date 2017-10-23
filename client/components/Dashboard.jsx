// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBarMenu from './NavigationBarMenu.jsx';
import GroupLists from './GroupLists.jsx';
import DashboardComponent from './DashboardComponent.jsx';

/**
 * @class Signin
 */
export class Dashboard extends Component {
  /**
     * @return {void}
     */
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.context.router.push('/');
    }
  }
  /**
   * @return {DOM} DOM Component
   */
  render() {
    return (
      <div className="content">
        <NavigationBarMenu />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <GroupLists />
            </div>
            <div className="col-md-7">
              <DashboardComponent />
            </div>
            <div className="col-md-2" />
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
};
/**
 * 
 * @param {object} state
 * @return {object} state object 
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.userLogin.isAuthenticated
  };
}
export default connect(mapStateToProps)(Dashboard);
