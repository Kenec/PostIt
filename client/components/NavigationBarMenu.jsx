// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/signinActions';
import { getUserGroups,
  getAdminGroups } from '../actions/groupActions';

/**
 * @class NavigationBarMenu
 */
export class NavigationBarMenu extends Component {
  /**
   * @constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  /**
   * @function componentWillMount
   * @return{void} void
   */
  componentWillMount() {
    const { user } = this.props.auth;
    this.props.getUserGroups({ username: user.username });
    this.props.getAdminGroups({ userId: user.id });
  }
  /**
   * @function logout
   * @param {event} event
   * @return {void} void 
   */
  onLogout(event) {
    event.preventDefault();
    this.props.logout();
  }
  /**
   * @function render
   * @return{DOM} DOM Component
   */
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="well well-sm container-fluid ">
        <div className="row">
          <div className="col-md-6 my_title">
            <img alt="" src="/images/postit.png" width="50px" height="50px" />
            <strong className="text-info"><b>POSTIT</b></strong>
          </div>
          <div className="col-md-6 right-align">
            <div className="btn-group col-md-6">
              <Link className="space_link" to="/dashboard">
                <span className="" /><b>DASHBOARD </b>
              </Link>
              <span className="space_link"><b> | </b></span>
              <Link className="" to="/createGroup">
                <span className="" /><b> CREATE GROUP</b>
              </Link>
            </div>
            <div className="col-md-6">
              <span className="glyphicon glyphicon-user space blue-text" />
              <span className="blue-text">
                <b className="space">Welcome {isAuthenticated && user.username }!</b>
              </span>
              <Link to="" className="space" onClick={this.onLogout}>
                    Logout
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" />
            <div className="col-md-6 right-align" />
          </div>
        </div>
      </div>
    );
  }
}

NavigationBarMenu.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  getAdminGroups: PropTypes.func.isRequired,

};
NavigationBarMenu.contextTypes = {
  router: PropTypes.object.isRequired
};
/**
 * @function mapStateToProps
 * @param {object} state
 * @return {object} state object 
 */
function mapStateToProps(state) {
  return {
    auth: state.userLogin,
    group: state.group
  };
}

export default connect(mapStateToProps,
  { logout,
    getUserGroups,
    getAdminGroups })(NavigationBarMenu);
