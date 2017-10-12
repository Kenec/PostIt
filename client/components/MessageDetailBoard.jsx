/* global localStorage */
// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router';
import moment from 'moment';
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
  getReadBy,
  updateReadBy
} from '../actions/messageActions';

/**
 * @class MessageDetailBoard
 */
class MessageDetailBoard extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupId: '',
      Message: '',
      priority_level: '',
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
   * @return {void} void
   */
  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    this.props.getReadBy(this.props.messageId);
    this.props.clearRetrievedMessageAction();
    if (isAuthenticated) {
      this.setState({
        sentBy: jwt.decode(localStorage.getItem('jwtToken')).id,
        priority_level: 'Normal',
      });
    }
  }

  /**
   * @return {void}
   */
  componentDidMount() {
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
   * 
   * @param {*} event
   * @return {void} 
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * 
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
    let allUsersWhoReadMessages = '';
    readBy.messageReadUsers.map((user) => {
      allUsersWhoReadMessages += `@${user.Reader.username} `;
    });
    // retrieve full message by id
    let singleReturnedMessage = '';
    singleReturnedMessage = messageData.map((groupMessage) => {
      if (groupMessage.id == this.props.messageId) {
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
                  <i>{groupMessage.priority_level}</i>
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
                {allUsersWhoReadMessages}
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
  group: React.PropTypes.object.isRequired,
  groupName: React.PropTypes.string.isRequired,
  auth: React.PropTypes.object.isRequired,
  retrieveMessage: React.PropTypes.func.isRequired,
  clearRetrievedMessageAction: React.PropTypes.func.isRequired,
  groupSelectedId: React.PropTypes.string.isRequired,
  updateNotification: React.PropTypes.func.isRequired,
  updateReadBy: React.PropTypes.func.isRequired,
  retrieveMessageAction: React.PropTypes.func.isRequired,
  getReadBy: React.PropTypes.func.isRequired,
  message: React.PropTypes.object.isRequired,
  messageId: React.PropTypes.string.isRequired,
};
MessageDetailBoard.contextTypes = {
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
    getReadBy,
    updateNotification,
    getNotification,
    updateReadBy
  })(MessageDetailBoard);
