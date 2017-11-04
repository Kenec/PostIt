/* global localStorage document */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import FilterMessages from './FilterMessages';
import { getUserGroups, getAdminGroups, getUsersInGroup }
  from '../actions/groupActions';
import { retrieveMessage, composeMessage, retrieveMessageAction,
  clearRetrievedMessageAction, addNotification, updateNotification,
  getNotification, getReadBy }
  from '../actions/messageActions';

/**
 * Displays Group board with message input fields
 * @class GroupBoard
 * @extends {Component}
 */
export class GroupBoard extends Component {
  /**
   * Creates an instance of GroupBoard
   * @constructor
   * @param {any} props
   * @memberof {GroupBoard}
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupId: '',
      Message: '',
      priorityLevel: 'Normal',
      errors: {},
      success: '',
      isLoading: false,
      sentBy: jwt.decode(localStorage.jwtToken).id,
      retrieveMessageError: '',
      retrievedMessages: [],
      readCheckbox: 'read',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleReadCheckBox = this.toggleReadCheckBox.bind(this);
  }

  /**
   * Life cycle method to be called before a component mounts
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.clearRetrievedMessageAction();
  }

  /**
   * Life cycle method to be called after a component mounts
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    // fire an action to get messages belonging to each user in a group
    this.props.retrieveMessage(this.props.groupSelectedId).then(
      (messageData) => {
        this.setState({ retrievedMessages: [] });
        this.props.retrieveMessageAction(messageData.data);
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
   * Handles onChange event
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
   * Handle onSubmit event
   * @method onSubmit
   * @param {object} event
   * @return {void} void
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.props.groupName !== 'No Group Found') {
      if (typeof (this.state.Message) === 'string'
        && this.state.priorityLevel &&
          this.state.sentBy) {
        this.setState({ errors: {}, success: '', isLoading: true });
        // set up message to be be sent
        const message = {
          message: this.state.Message,
          priorityLevel: this.state.priorityLevel,
          sentBy: this.state.sentBy,
          readBy: this.state.sentBy
        };
        // fire the compose message action to send message
        this.props.composeMessage(this.props.groupSelectedId, message)
          .then(
            ({ data }) => {
              // fire an action to retrive the message
              this.props.retrieveMessage(this.props.groupSelectedId).then(
                (messageData) => {
                  this.setState({ retrievedMessages: [] });
                  this.props.retrieveMessageAction(messageData.data);
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

              const id = data.id;
              const groupId = data.group;
              this.props.getUsersInGroup(this.props.groupSelectedId).then(
                ({ data }) => {
                  const users = data.users;
                  users.map((user) => {
                    let readStatus = 0;
                    if (user.id === this.state.sentBy) {
                      readStatus = 1;
                    }
                    // fire an action to add notification
                    this.props.addNotification(id,
                      {
                        userId: user.id,
                        readStatus,
                        senderId: this.state.sentBy,
                        groupId,
                      });
                  });
                  this.props.getNotification(
                    { userId: jwt.decode(localStorage.jwtToken).id }
                  );
                  this.setState({
                    success: 'Sent!',
                    isLoading: false,
                    Message: '',
                    priorityLevel: 'Normal',
                  });
                  this.toastMessage();
                },
                ({ response }) => {
                  this.setState({
                    errors: response.data,
                    isLoading: false,
                    Message: '',
                    priorityLevel: 'Normal',
                  });
                }
              );
            },
            ({ response }) => {
              this.setState({
                errors: response.data,
                isLoading: false,
                Message: '',
                priorityLevel: 'Normal',
              });
            }
          ).catch(() => {});
      }
    }
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
   * Toast message for sent message
   * @method toastMessage
   * @return {void}
   */
  toastMessage() {
    // Get the snackbar DIV
    this.toastMessage = document.getElementById('snackbar');
    // Add the "show" class to DIV
    this.toastMessage.className = 'show';
    // After 1 seconds, remove the show class from DIV
    setTimeout(
      () => {
        this.toastMessage.className =
        this.toastMessage.className.replace('show', '');
      }, 1000);
  }

  /**
   * Toggle read and unread checkbox
   * @method toggleReadChechBox
   * @param {object} event
   * @return {void}
   */
  toggleReadCheckBox(event) {
    this.setState({
      readCheckbox: event.target.value
    });
  }

  /**
   * Displays the DOM Component
   * @method render
   * @return {DOM} DOM Component
   */
  render() {
    const { errors, success, retrieveMessageError } = this.state;
    const { groups, groupsBelonged } = this.props.group;
    const { messageData } = this.props.message;
    const groupName = this.props.groupName;

    if (!groups || !groupsBelonged || groupName === 'No Group Found') {
      return <h4>Loading ...</h4>;
    }

    if (!groups.groups) {
      this.context.router.push('/dashboard');
    }

    let groupsMessages;
    if (messageData) {
      groupsMessages = messageData.map((groupMessage) => {
        if (groupName !== 'No Group Found') {
          // filter the message in the message board
          if (this.state.readCheckbox === 'unread') {
            if (!this.readBy(groupMessage.ReadBy)) {
              return (
                <div key={groupMessage.id}>
                  <FilterMessages
                    groupSelectedId={this.props.groupSelectedId}
                    groupMessage={groupMessage}
                  />
                </div>
              );
            }
          } else if (this.state.readCheckbox === 'read') {
            if (this.readBy(groupMessage.ReadBy)) {
              return (
                <div key={groupMessage.id}>
                  <FilterMessages
                    groupSelectedId={this.props.groupSelectedId}
                    groupMessage={groupMessage}
                  />
                </div>
              );
            }
          }
        }
        return groupsMessages;
      });
    }

    return (
      <div className="row">
        <div className="blue-text text-darken-2">
          <div className="well well-sm no_spacing">
            <b>Group: { groupName }</b>
            <span className="pull-right">
              <input
                className="with-gap"
                onChange={this.toggleReadCheckBox}
                checked={this.state.readCheckbox === 'read'}
                name="read"
                type="radio"
                value="read"
                id="read"
              />
              <label htmlFor="read">Read</label>

              <input
                className="with-gap"
                onChange={this.toggleReadCheckBox}
                checked={this.state.readCheckbox === 'unread'}
                name="unread"
                value="unread"
                type="radio"
                id="unread"
              />
              <label htmlFor="unread">Unread</label>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="well well-sm message_board no_spacing">
            <div className="">
              {retrieveMessageError && <span className="help-block red-text">
                <b>{retrieveMessageError}</b></span>}
              {groupsMessages && groupsMessages}
            </div>
          </div>
          <div className="well well-sm">
            <form onSubmit={this.onSubmit} className="" action="" method="">
              <select
                onChange={this.onChange}
                value={this.state.priorityLevel}
                className="form-control"
                name="priorityLevel"
              >
                <option value="Normal" defaultValue>Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
              <textarea
                onChange={this.onChange}
                value={this.state.Message}
                name="Message"
                placeholder="Type your message"
                className="form-control"
                id="message"
                required
              />
              <button
                type="submit"
                disabled={this.state.isLoading}
                className="btn btn-primary"
              > Send Message
              </button>
              <p>
                {success && <span className="help-block green-text">
                  <span id="snackbar"><b>{success}</b></span>
                </span>}
                {errors.status && <span className="help-block red-text">
                  <span id="snackbar"><b>{errors.status}</b></span>
                </span>}
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

GroupBoard.propTypes = {
  composeMessage: PropTypes.func.isRequired,
  groupSelectedId: PropTypes.string.isRequired,
  retrieveMessage: PropTypes.func.isRequired,
  clearRetrievedMessageAction: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  getNotification: PropTypes.func.isRequired,
  retrieveMessageAction: PropTypes.func.isRequired,
  getUsersInGroup: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired
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

/**
 * Map dispatch to props
 * @return {object} dispatch objects
 */
const mapDispatchToProps = {
  addNotification,
  getUserGroups,
  clearRetrievedMessageAction,
  getAdminGroups,
  retrieveMessageAction,
  composeMessage,
  getUsersInGroup,
  retrieveMessage,
  updateNotification,
  getNotification,
  getReadBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupBoard);
