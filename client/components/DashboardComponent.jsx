/* global localStorage */
// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getUserGroups, getAdminGroups } from '../actions/groupActions';
import { retrieveMessage, getNotification } from '../actions/messageActions';

/**
 * Display Dashboard
 * @class DashboardComponent
 * @extends {Component}
 */
export class DashboardComponent extends Component {
  /**
   * Life Cycle method to be called before a component mounts
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.getNotification(
      { userId: jwt.decode(localStorage.jwtToken).id }
    );
  }

  /**
   * Displays the DOM component
   * @method render
   * @return {DOM} DOM Component
   */
  render() {
    // deconstruct variable from props
    const { groups, groupsBelonged } = this.props.group;
    const { notificationData } = this.props.message;

    if (!groups || !groupsBelonged || !notificationData) {
      return <h4>Loading ...</h4>;
    }

    let unreadMessages = '';
    const noOfUnreadMessages = notificationData.messageRes.length;
    if (notificationData.messageRes !== 'undefined' &&
    notificationData.messageRes.length > 0) {
      unreadMessages = notificationData.messageRes.map(unreadMessage => (<div
        key={unreadMessage.messageId}
        value={unreadMessage.MessageId}
        className="white"
      >
        <div>
          <Link
            className="black-text lighten-5"
            to={`/group/${unreadMessage.Group.id}/${unreadMessage.messageId}`}
          >
            <b>{unreadMessage.User.username}</b>
            <i> sent a message on </i>
            <em> <b>{unreadMessage.Group.groupName}  </b></em>
            <i>{unreadMessage.Messages.message.substring(0, 100)}</i>
            <p className="red-text lighten-5">
              {moment(unreadMessage.createdAt, moment.ISO_8601).fromNow()}
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
        <div className="row well well-sm message_board ">
          <div className="">
            <div className="row">
              {unreadMessages}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardComponent.propTypes = {
  getNotification: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

/**
 * Map state to props
 * @function mapStateToProps
 * @param {object} state 
 * @return {object} state objects
 */
const mapStateToProps = state => (
  {
    group: state.group,
    auth: state.userLogin,
    message: state.message
  }
);

/**
 * Map dispatch to props
 * @return {object} dispatch objects
 */
const mapDispatchToProps = {
  getNotification,
  getUserGroups,
  getAdminGroups,
  retrieveMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
