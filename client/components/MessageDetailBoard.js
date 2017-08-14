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
        getUsersWhoReadMessage
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
       !messageData) {
      return (
        <h4>Loading ...</h4>
      )
    }
    let messageUserReaders
    let singleReturnedMessage = ''
    singleReturnedMessage = messageData.map((groupMessage) => {
        if(groupMessage.id == this.props.messageId){
          this.props.updateNotification(groupMessage.id,
              {userId: this.state.sentBy, readStatus: 1 });
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
          <Link to={`/group/${this.props.groupSelectedId}`}>{' '+groupName}</Link>
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
  getNotification
})(MessageDetailBoard);
