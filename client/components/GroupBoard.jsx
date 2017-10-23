/* global localStorage */
/* global document */

// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FilterMessages from './FilterMessages.jsx';
import { getUserGroups,
  getAdminGroups,
  getUsersInGroup
} from '../actions/groupActions';
import { retrieveMessage,
  composeMessage,
  retrieveMessageAction,
  clearRetrievedMessageAction,
  addNotification,
  updateNotification,
  getNotification,
  getReadBy
} from '../actions/messageActions';

/**
 * @class GroupBoard
 */
export class GroupBoard extends Component {
  /**
   * @constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupId: '',
      Message: '',
      priority_level: 'Normal',
      errors: {},
      success: '',
      isLoading: false,
      sentBy: jwt.decode(localStorage.jwtToken).id,
      retrieveMessageError: '',
      retrievedMessages: [],
      readCheckbox: 'unread',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleReadCheckBox = this.toggleReadCheckBox.bind(this);
  }

  /**
   * @function componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.clearRetrievedMessageAction();
  }

  /**
   * @function componentDidMount
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
   * @function onChange
   * @param {event} event 
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * @function onSubmit
   * @param {event} event
   * @return {void} void
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.props.groupName !== 'No Group Found') {
      if (typeof (this.state.Message) === 'string'
        && this.state.priority_level &&
          this.state.sentBy) {
        this.setState({ errors: {}, success: '', isLoading: true });
        const { messageData } = this.props.message;
        const messageSentData = {
          message: this.state.Message,
          priority_level: this.state.priority_level,
          sentBy: this.state.sentBy,
          readBy: this.state.sentBy
        };
        this.props.composeMessage(this.props.groupSelectedId, messageSentData)
          .then(
            ({ data }) => {
              const updateMessageStore = {
                id: data.id,
                message: data.message,
                groupId: data.group,
                sentBy: data.sentBy,
                priority_level: data.priority_level,
                readBy: data.readBy,
                createdAt: data.createdAt,
                Users: {
                  id: jwt.decode(localStorage.jwtToken).id,
                  username: jwt.decode(localStorage
                    .getItem('jwtToken')).username,
                }
              };
              const newMessageData = messageData.concat(updateMessageStore);
              this.props.retrieveMessageAction(newMessageData);
              this.props.getUsersInGroup(this.props.groupSelectedId).then(
                ({ data }) => {
                  const usersArray = data.users;
                  const sender = jwt.decode(
                    localStorage.jwtToken).id;
                  usersArray.map((user) => {
                    let readStatus = 0;
                    if (user.id === sender) {
                      readStatus = 1;
                    }
                    this.props.addNotification(updateMessageStore.id,
                      {
                        userId: user.id,
                        readStatus,
                        senderId: sender,
                        groupId: updateMessageStore.groupId,
                      });
                  });
                  this.props.getNotification(
                    { userId: jwt.decode(localStorage.jwtToken).id }
                  );
                  this.setState({
                    success: 'Sent!',
                    isLoading: false,
                    Message: '',
                    priority_level: 'Normal',
                  });
                  this.toastMessage();
                },
                ({ response }) => {
                  this.setState({
                    errors: response.data,
                    isLoading: false,
                    Message: '',
                    priority_level: 'Normal',
                  });
                }
              );
            },
            ({ response }) => {
              this.setState({
                errors: response.data,
                isLoading: false,
                Message: '',
                priority_level: 'Normal',
              });
            }
          ).catch(() => {});
      }
    }
  }
  /**
   * @function readBy
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
   * @function toastMessage
   * @return {void}
   */
  toastMessage() {
    // Get the snackbar DIV
    this.toastMessage = document.getElementById('snackbar');
    // Add the "show" class to DIV
    this.toastMessage.className = 'show';
    // After 3 seconds, remove the show class from DIV
    setTimeout(
      () => {
        this.toastMessage.className =
        this.toastMessage.className.replace('show', '');
      }, 2000);
  }
  /**
   * @function toggleReadChechBox
   * @param {*} event
   * @return {void} 
   */
  toggleReadCheckBox(event) {
    this.setState({
      readCheckbox: event.target.value
    });
  }

  /**
   * @function render
   * @return {DOM} DOM Component
   */
  render() {
    const { errors, success, retrieveMessageError } = this.state;
    const { groups, groupsBelonged } = this.props.group;
    const { messageData } = this.props.message;
    const groupName = this.props.groupName;
    // const groupId = this.props.groupId;

    if (!groups || !groupsBelonged || groupName === 'No Group Found') {
      return (
        <h4>Loading ...</h4>
      );
    }

    if (!groups.groups) {
      this.context.router.push('/dashboard');
    }

    let groupsMessagesList;
    if (messageData) {
      groupsMessagesList = messageData.map((groupMessage) => {
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
      });
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
            <span className="pull-right">
              <input
                className="with-gap"
                onClick={this.toggleReadCheckBox}
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
                name="read"
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
              {groupsMessagesList && groupsMessagesList}
            </div>
          </div>
          <div className="well well-sm">
            <form onSubmit={this.onSubmit} className="" action="" method="">
              <select
                onChange={this.onChange}
                value={this.state.priority_level}
                className="form-control"
                name="priority_level"
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
 * @param {*} state
 * @return {object} state object 
 */
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLogin,
    message: state.message
  };
}

export default connect(mapStateToProps,
  { addNotification,
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
  })(GroupBoard);
