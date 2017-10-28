/* global localStorage */
// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getUserGroups, getAdminGroups, getUsersInGroup }
  from '../actions/groupActions';
import { retrieveMessage, composeMessage, retrieveMessageAction,
  clearRetrievedMessageAction, addNotification, updateNotification,
  getNotification, getReadBy, updateReadBy }
  from '../actions/messageActions';

/**
 * Display the Full Message
 * @class MessageDetailBoard
 * @extends {Component}
 */
export class MessageDetailBoard extends Component {
  /**
   * Create an instance of MessageDetailBoard
   * @constructor
   * @param {any} props
   * @memberof {MessageDetailBoard}
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupId: '',
      Message: '',
      priorityLevel: '',
      errors: {},
      success: '',
      isLoading: false,
      sentBy: '',
      retrieveMessageError: '',
      retrievedMessages: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Life cycle method to be called before a component mounts
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.getReadBy(parseInt(this.props.messageId, 10));
    this.props.clearRetrievedMessageAction();
    this.setState({
      sentBy: jwt.decode(localStorage.jwtToken).id,
      priorityLevel: 'Normal',
    });
  }

  /**
   * Life cycle method to be called after a component mounts
   * @method componentDidMount
   * @return {void} void
   */
  componentDidMount() {
    this.props.retrieveMessage(this.props.groupSelectedId).then(
      (message) => {
        this.setState({ retrievedMessages: [] });
        this.props.retrieveMessageAction(message.data);
        const { updatedMessageData } = this.props.message;
        this.setState({
          retrievedMessages: updatedMessageData,
        });
      },
      ({ response }) => {
        this.setState({
          retrieveMessageError: response.data.message,
        });
      }
    );
  }

  /**
   * Handle onChange event
   * @method onChange
   * @param {object} event
   * @return {void} 
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Find readBy's
   * @method readBy
   * @param {array} existingReaders  
   * @return {boolean} foundUser
   */
  readBy(existingReaders) {
    let userId;
    let foundUser = false;
    if (existingReaders) {
      existingReaders.split(',').forEach((val) => {
        userId = parseInt(val, 10);
        if (userId === this.state.sentBy) {
          foundUser = true;
        }
      });
    }
    return foundUser;
  }


  /**
   * Display the DOM Component
   * @method render
   * @return {DOM} DOM Component
   */
  render() {
    const { groups, groupsBelonged } = this.props.group;
    const { messageData, readBy } = this.props.message;
    const groupName = this.props.groupName;

    if (!groups ||
       !groupsBelonged ||
       groupName === 'No Group Found' ||
       !messageData || !readBy) {
      return (
        <h4>Loading....</h4>
      );
    }

    // retrieve all users who have read this message
    let readByUsers = '';
    readBy.messageReadUsers.map((user) => {
      readByUsers += `@${user.Reader.username} `;
      return true;
    });

    // retrieve full message by id
    let singleReturnedMessage = '';
    singleReturnedMessage = messageData.map((groupMessage) => {
      if (groupMessage.id === parseInt(this.props.messageId, 10)) {
        this.props.updateNotification(groupMessage.id,
          { userId: this.state.sentBy, readStatus: 1 });
        // update the ReadBy column if the user have not read this message
        if (!this.readBy(groupMessage.ReadBy)) {
          // fire an action to update the readBy column
          this.props.updateReadBy(groupMessage.id,
            { readBy: this.state.sentBy });
        }
        return (
          <div key={groupMessage.id}>
            <div className="well well-sm white no_spacing">
              <p id={groupMessage.id}>
                <span className="left black-text cyan span_spacing lighten-5">
                  <i><b>{groupMessage.Users.username}</b></i>
                </span>
                <span className="left yellow lighten-5">
                  <i>{groupMessage.priorityLevel}</i>
                </span>
                <span className="right red-text lighten-5">
                  {moment(groupMessage.createdAt, moment.ISO_8601).fromNow()}
                </span>
              </p>
              <div>
                <hr />
                <p className="black-text lighten-3" id={groupMessage.id}>
                  {groupMessage.message}
                </p>
              </div>
            </div>
            <div className="tooltipp">
              <em><b>Message Readers</b></em>
              <small><i>  hover here</i></small>
              <span className="tooltipptext">
                {readByUsers}
              </span>
            </div>
          </div>
        );
      }
    });

    if (!groups.groups) {
      this.context.router.push('/dashboard');
    }
    return (
      <div className="row">
        <div className="blue-text text-darken-2">
          <div className="well well-sm no_spacing">
            <b>Group:
              <Link to={`/group/${this.props.groupSelectedId}`}>
                {` ${groupName}`}
              </Link>
            </b>
          </div>
          <span className="pull-right" />
        </div>
        <div className="row">
          <div className="well well-sm message_board no_spacing">
            <div className="">
              {singleReturnedMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MessageDetailBoard.propTypes = {
  group: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired,
  retrieveMessage: PropTypes.func.isRequired,
  clearRetrievedMessageAction: PropTypes.func.isRequired,
  groupSelectedId: PropTypes.string.isRequired,
  updateNotification: PropTypes.func.isRequired,
  updateReadBy: PropTypes.func.isRequired,
  retrieveMessageAction: PropTypes.func.isRequired,
  getReadBy: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  messageId: PropTypes.string.isRequired,
};

MessageDetailBoard.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * @function mapStateToProps
 * @param {any} state
 * @return {object} state object
 */
const mapStateToProps = state => (
  {
    group: state.group,
    auth: state.userLogin,
    message: state.message
  }
);

const mapDispatchToProps = {
  addNotification,
  getUserGroups,
  clearRetrievedMessageAction,
  getAdminGroups,
  retrieveMessageAction,
  composeMessage,
  getUsersInGroup,
  retrieveMessage,
  getReadBy,
  updateNotification,
  getNotification,
  updateReadBy
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailBoard);
