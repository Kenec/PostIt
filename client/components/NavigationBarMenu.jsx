// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/signinActions';
import { getUserGroups,
  getAdminGroups } from '../actions/groupActions';

/**
 * @class NavigationBarMenu
 */
class NavigationBarMenu extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  /**
   * @return{void} void
   */
  componentWillMount() {
    const { user } = this.props.auth;
    this.props.getUserGroups({ username: user.username });
    this.props.getAdminGroups({ userId: user.id });
  }
  /**
   * 
   * @param {event} event
   * @return {void} void 
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  /**
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
              <Link to="" className="space" onClick={this.logout}>
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
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
  getUserGroups: React.PropTypes.func.isRequired,
  getAdminGroups: React.PropTypes.func.isRequired,

};
NavigationBarMenu.contextTypes = {
  router: React.PropTypes.object.isRequired
};
/**
 * 
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
