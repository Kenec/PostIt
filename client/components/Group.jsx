/* global localStorage */
// import
import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBarMenu from './NavigationBarMenu.jsx';
import GroupBoard from './GroupBoard.jsx';
import SearchMember from './SearchMember.jsx';
import GroupMembers from './GroupMembers.jsx';
import { retrieveMessage } from '../actions/messageActions';
import { getUserGroups,
  getAdminGroups } from '../actions/groupActions';

/**
 * @class Group
 */
export class Group extends Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    const { user } = this.props.auth;
    this.setState({
      sentBy: user.id, // jwt.decode(localStorage.getItem('jwtToken')).id,
      priority_level: 'Normal',
    });
    this.props.getUserGroups({ username: user.username });
    this.props.getAdminGroups({ userId: user.id });
  }

  /**
   * @return {DOM} DOM Component
   */
  render() {
    const { groups, groupsBelonged } = this.props.group;
    const id = this.props.params.groupid;

    let groupName;
    let found = false;

    if (!groups || !groupsBelonged) {
      return (
        <h4>Loading ...</h4>
      );
    }

    groups.groups.map((group) => {
      if (group.id == id) {
        groupName = group.groupName;
        found = true;
      }
      return found;
    });

    if (!found) {
      groupName = 'No Group Found';
      this.context.router.push('/notFound');
    }

    return (
      <div className="content">
        <NavigationBarMenu />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <GroupMembers groupSelectedId={id} />
            </div>
            <div className="col-md-6">
              <GroupBoard groupSelectedId={id} groupName={groupName} />
            </div>
            <div className="col-md-3">
              <SearchMember groupId={id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Group.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  getAdminGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
Group.contextTypes = {
  router: PropTypes.object.isRequired
};
/**
 * 
 * @param {*} state 
 * @return {object} state object
 */
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLogin,
    message: state.message,
  };
}
export default connect(mapStateToProps,
  { getUserGroups,
    getAdminGroups,
    retrieveMessage })(Group);
