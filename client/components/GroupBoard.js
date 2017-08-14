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
        getNotification
      } from '../actions/messageActions';


class GroupBoard extends Component {
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
    if(this.props.groupName !== 'No Group Found'){
      if(typeof(this.state.Message) == 'string' && this.state.priority_level &&
          this.state.sentBy){
        this.setState({ errors: {}, success: '', isLoading:true });
        const messageSentData = {
          message: this.state.Message,
          priority_level: this.state.priority_level,
          sentBy: this.state.sentBy
        }
        const { messageData } = this.props.message;
        this.props.composeMessage(this.props.groupSelectedId, messageSentData).then(
          ({data}) => {
            const updateMessageStore = {
              id: data.id,
              message: data.message,
              groupId: data.group,
              sentBy: data.sentBy,
              priority_level: data.priority_level,
              createdAt: data.createdAt,
              Users: {
                id: jwt.decode(localStorage.getItem('jwtToken')).id,
                username: jwt.decode(localStorage.getItem('jwtToken')).username,
              }
            }
            const newMessageData = messageData.concat(updateMessageStore);
            this.props.retrieveMessageAction(newMessageData);
            this.props.getUsersInGroup(this.props.groupSelectedId).then(
              ({data}) => {
                const usersArray = data.users;
                const sender = jwt.decode(localStorage.getItem('jwtToken')).id;
                usersArray.map(user => {
                  let readStatus = 0;
                  if (user.id === sender){
                    readStatus = 1;
                  }
                  this.props.addNotification(updateMessageStore.id,
                    {
                      userId: user.id,
                      readStatus: readStatus,
                      senderId: sender,
                      groupId: updateMessageStore.groupId,
                    });
                  });
                  this.props.getNotification(
                    {userId: jwt.decode(localStorage.getItem('jwtToken')).id}
                  );
                  this.setState({
                  success: 'Sent!',
                  isLoading: false,
                  Message: '',
                  priority_level: 'Normal',
                });
              },
              ({response}) => {
                  this.setState({
                    errors: response.data,
                    isLoading: false,
                    Message: '',
                    priority_level: 'Normal',
                  });
              }
            );

          },
          ({response}) => {
            this.setState({
              errors: response.data,
              isLoading: false,
              Message: '',
              priority_level: 'Normal',
            });
          }
        ).catch((error) => {});
      }
    }
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    const { getUserGroups, getGroupsCreatedByUser } = this.props.group;
    const {groups, groupsByUser} = this.props.group;
    const groupId = this.props.groupSelectedId;
    const groupName = this.props.groupName;
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
    const { messageData } = this.props.message;
    const groupName = this.props.groupName;
    const groupId = this.props.groupId;

    if(!groups || !groupsByUser || groupName === 'No Group Found') {
      return (
        <h4>Loading ...</h4>
      )
    }


    if(!groups.groups) {
        this.context.router.push('/dashboard')
    }
    let groupsMessagesList;
    if(messageData){
      groupsMessagesList = messageData.map((groupMessage) => {
        if(groupName !== 'No Group Found') {
          return(
              <div key={groupMessage.id}>
              <Link to={`/group/${this.props.groupSelectedId}/${groupMessage.id}`}>
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
                </Link>
              </div>
            )
          }
      });
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
              {retrieveMessageError && <span className="help-block red-text">
                <b>{retrieveMessageError}</b></span>}
              {groupsMessagesList && groupsMessagesList}
            </div>
          </div>
          <div className="well well-sm">
            <form onSubmit={this.onSubmit} className="" action="" method="">
              <select onChange={this.onChange}
                value={this.state.priority_level}
                className="form-control"
                name="priority_level">
                  <option value="Normal" defaultValue>Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Critical">Critical</option>
              </select>
              <textarea onChange={this.onChange} value={this.state.Message} name="Message" placeholder="Type your message" className="form-control" id="message"></textarea>
              <button type="submit" disabled={this.state.isLoading} className="btn btn-primary">Send Message</button>
              <p>
                {success && <span className="help-block green-text"><b>{success}</b></span>}
                {errors.status && <span className="help-block red-text"><b>{errors.status}</b></span>}
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
GroupBoard.propTypes = {
  getUserGroups: React.PropTypes.func.isRequired,
  getGroupsCreatedByUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  retrieveMessage: React.PropTypes.func.isRequired,
  clearRetrievedMessageAction: React.PropTypes.func.isRequired,
  addNotification: React.PropTypes.func.isRequired,
  updateNotification: React.PropTypes.func.isRequired,
  getNotification: React.PropTypes.func.isRequired,
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
  updateNotification,
  getNotification
})(GroupBoard);
