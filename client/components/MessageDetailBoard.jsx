// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router';
import moment from 'moment';
import { getUserGroups,
         getGroupsCreatedByUser,
         getUsersInGroup
       } from '../actions/groupActions';
import { composeMessage } from '../actions/messageActions';
import { retrieveMessage,
        retrieveMessageAction,
        clearRetrievedMessageAction,
        addNotification,
        updateNotification,
        getNotification,
        getUsersWhoReadMessage,
        updateReadBy
      } from '../actions/messageActions';


class MessageDetailBoard extends Component {
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
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    // get MessageData from the store
    const { messageData } = this.props.message;
    // fire an action to retrieve messages
    this.props.retrieveMessage(this.props.groupSelectedId).then(
      (messageData) => {
        this.setState({ retrievedMessages: []});
        this.props.retrieveMessageAction(messageData.data);
        const { updatedMessageData } = this.props.message;
        this.setState({
          retrievedMessages: updatedMessageData,
        });
      },
      ({response}) => {
        this.setState({
          retrieveMessageError: response.data.message,
        });
      }
    );

  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  // method to check if a user have read this message before
  checkIfUserHaveReadMessage(existingReaders){
      let userId;
      let foundUser = false;
      if( existingReaders ) {
        existingReaders.split(",").forEach((val) => {
          userId = parseInt(val, 10);
          if (userId === this.state.sentBy) {
            foundUser = true;
          }
        });
      }

    return foundUser
  }

  // this method will be called before component mounts
  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    const { getUserGroups, getGroupsCreatedByUser } = this.props.group;
    const {groups, groupsByUser} = this.props.group;
    const groupId = this.props.groupSelectedId;
    const groupName = this.props.groupName;
    this.props.getUsersWhoReadMessage(this.props.messageId);
    this.props.clearRetrievedMessageAction();
    if(isAuthenticated){
      this.setState({
        sentBy: jwt.decode(localStorage.getItem('jwtToken')).id,
        priority_level: 'Normal',
      });
    }

  }


  render(){
    const { errors, success, retrieveMessageError } = this.state;
    const {groups, groupsByUser} = this.props.group;
    const { messageData, usersWhoHaveReadMessage } = this.props.message;
    const groupName = this.props.groupName;
    const groupId = this.props.groupId;

    if(!groups ||
       !groupsByUser ||
       groupName === 'No Group Found' ||
       !messageData || !usersWhoHaveReadMessage) {
      return (
        <h4>Loading ...</h4>
      )
    }
    // retrieve all users who have read this message
    let allUsersWhoReadMessages = '';
    usersWhoHaveReadMessage.messageReadUsers.map((user) => {
      allUsersWhoReadMessages +=  `@${user.Reader.username} `;
    });
    // retrieve full message by id
    let singleReturnedMessage = ''
    singleReturnedMessage = messageData.map((groupMessage) => {
        if(groupMessage.id == this.props.messageId){
          this.props.updateNotification(groupMessage.id,
              {userId: this.state.sentBy, readStatus: 1 });
          // update the ReadBy column if the user have not read this message
          if(!this.checkIfUserHaveReadMessage(groupMessage.ReadBy)) {
            // fire an action to update the readBy column
            this.props.updateReadBy(groupMessage.id,
                {readBy: this.state.sentBy });
          }
          return (
            <div key={groupMessage.id}>
            <div className="well well-sm white no_spacing">
                <p id={groupMessage.id}>
                  <span className='left black-text cyan span_spacing lighten-5'>
                    <i><b>{groupMessage.Users.username}</b></i>
                  </span>
                  <span className='left yellow lighten-5'>
                    <i>{groupMessage.priority_level}</i>
                  </span>
                  <span className='right red-text lighten-5'>
                  {moment(groupMessage.createdAt, moment.ISO_8601).fromNow()}
                  </span>
                </p>
                <div>
                  <hr/>
                  <p className='black-text lighten-3' id={groupMessage.id}>
                    {groupMessage.message}
                  </p>
                </div>
              </div>
              <div className='tooltipp'>
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

    if(!groups.groups) {
        this.context.router.push('/dashboard')
    }

    return(
      <div className="row">
        <div className="blue-text text-darken-2">
        <div className="well well-sm no_spacing">
          <b>Group:
          <Link to={`/group/${this.props.groupSelectedId}`}>
            {' '+groupName}
          </Link>
          </b>
        </div>
        <span className="pull-right">

        </span>
        </div>
        <div className="row">
          <div className="well well-sm group_board no_spacing">
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
  getUserGroups: React.PropTypes.func.isRequired,
  getGroupsCreatedByUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  retrieveMessage: React.PropTypes.func.isRequired,
  clearRetrievedMessageAction: React.PropTypes.func.isRequired,
  addNotification: React.PropTypes.func.isRequired,
  updateNotification: React.PropTypes.func.isRequired,
  updateReadBy: React.PropTypes.func.isRequired,
  getNotification: React.PropTypes.func.isRequired,
  getUsersWhoReadMessage: React.PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
    message: state.message
  }
}
export default connect(mapStateToProps,
  {addNotification,
  getUserGroups,
  clearRetrievedMessageAction,
  getGroupsCreatedByUser,
  retrieveMessageAction,
  composeMessage,
  getUsersInGroup,
  retrieveMessage,
  getUsersWhoReadMessage,
  updateNotification,
  getNotification,
  updateReadBy
})(MessageDetailBoard);