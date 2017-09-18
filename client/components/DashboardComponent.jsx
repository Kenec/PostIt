/* global localStorage */
// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Link } from 'react-router';
import { getUserGroups,
  getGroupsCreatedByUser } from '../actions/groupActions';
import { retrieveMessage,
  getNotification } from '../actions/messageActions';

/**
 * @class DashboardComponent
 */
class DashboardComponent extends Component {
  /**
   * @return {DOM} DOM Component
   */
  componentWillMount() {
    this.props.getNotification(
      { userId: jwt.decode(localStorage.getItem('jwtToken')).id }
    );
  }

  /**
   * @return {DOM} DOM Component
   */
  render() {
    // deconstruct variable from props
    const { groups, groupsByUser } = this.props.group;
    const { notificationData } = this.props.message;

    if (!groups || !groupsByUser || !notificationData) {
      return (
        <h4>Loading ...</h4>
      );
    }

    let unreadMessagesList = '';
    const noOfUnreadMessages = notificationData.messageRes.length;
    if (notificationData.messageRes !== 'undefined' &&
    notificationData.messageRes.length > 0) {
      unreadMessagesList = notificationData.messageRes.map(unreadMessages => (<div
        key={unreadMessages.messageId}
        value={unreadMessages.MessageId}
        className="white"
      >
        <div>
          <Link
            className="black-text lighten-5"
            to={`/group/${unreadMessages.Group.id}/${unreadMessages.messageId}`}
          >
            <b>{unreadMessages.User.username}</b>
            <i> sent a message on </i>
            <em> <b>{unreadMessages.Group.groupName}  </b></em>
            <i>{unreadMessages.Messages.message.substring(0, 100)}</i>
            <p className="red-text lighten-5">
              {moment(unreadMessages.createdAt, moment.ISO_8601).fromNow()}
            </p>
          </Link>
        </div>

      </div>));
    }

    return (
      <div className="row">
        <div className="blue-text text-darken-2">
          <div className="well well-sm no_spacing">
            <b>NOTIFICATIONS</b>
            <span className="pull-right red-text">
            You have ({noOfUnreadMessages}) unread messages
            </span>
          </div>
          <span className="pull-right" />
        </div>
        <div className="row well well-sm group_board ">
          <div className="">
            <div className="row">
              {unreadMessagesList}
            </div>
          </div>

        </div>
      </div>
    );
  }
}
DashboardComponent.propTypes = {
  getNotification: React.PropTypes.func.isRequired,
  group: React.PropTypes.object.isRequired,
  message: React.PropTypes.object.isRequired,
};
/**
 * 
 * @param {*} state 
 * @return {object} state objects
 */
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
    message: state.message
  };
}
export default connect(mapStateToProps,
  { getNotification,
    getUserGroups,
    getGroupsCreatedByUser,
    retrieveMessage })(DashboardComponent);
