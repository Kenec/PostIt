// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupLists from './GroupLists';
import NavigationBarMenu from './NavigationBarMenu';
import Dashboard from './Dashboard';

/**
 * Contain DashboardPage sub components
 * @class DashboardPage
 * @extends {Component}
 */
export class DashboardPage extends Component {
  /**
  * Life Cycle method to be called before a component mounts
  * @method componentWillMount
  * @return {void} void
  */
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  /**
   * Displays the DOM component
   * @method render
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
              <Dashboard />
            </div>
            <div className="col-md-2" />
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Map state to props
 * @function mapStateToProps
 * @param {object} state
 * @return {object} state object
 */
const mapStateToProps = state => (
  {
    isAuthenticated: state.userLogin.isAuthenticated
  }
);

export default connect(mapStateToProps)(DashboardPage);
