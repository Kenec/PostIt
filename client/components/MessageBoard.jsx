/* global localStorage */
// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import NavigationBarMenu from './NavigationBarMenu';
import MessageDetailBoard from './MessageDetailBoard';
import SearchMember from './SearchMember';
import GroupMembers from './GroupMembers';
import { retrieveMessage } from '../actions/messageActions';
import { getUserGroups,
  getGroupsCreatedByUser } from '../actions/groupActions';

  /**
   * @class MessageBoard
   */
class MessageBoard extends Component {
  /**
   * @return {void}
   */
  componentWillMount() {
    const { /* isAuthenticated, */ user } = this.props.auth;
    // if (isAuthenticated) {
    this.setState({
      sentBy: jwt.decode(localStorage.getItem('jwtToken')).id,
      priority_level: 'Normal',
    });
    this.props.getUserGroups({ username: user.username });
    this.props.getGroupsCreatedByUser({ userId: user.id });
    // }
  }

  /**
   * @return {DOM} DOM Component
   */
  render() {
    const { groups, groupsByUser } = this.props.group;
    const id = this.props.params.groupid;
    const messageId = this.props.params.messageid;

    let groupName;
    let found = false;

    if (!groups || !groupsByUser) {
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
      return (
        this.context.router.push('/dashboard')
      );
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
              <MessageDetailBoard
                groupSelectedId={id}
                groupName={groupName}
                messageId={messageId}
              />
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
MessageBoard.propTypes = {
  getUserGroups: React.PropTypes.func.isRequired,
  getGroupsCreatedByUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  group: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
};
MessageBoard.contextTypes = {
  router: React.PropTypes.object.isRequired
};
/**
 * 
 * @param {*} state
 * @return {object} state object 
 */
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
    message: state.message,
  };
}
export default connect(mapStateToProps,
  { getUserGroups,
    getGroupsCreatedByUser,
    retrieveMessage })(MessageBoard);
