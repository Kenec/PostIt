import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import NavigationBarMenu from './NavigationBarMenu';
import LeftSideGroupMenu from './LeftSideGroupMenu';
import MessageDetailBoard from './MessageDetailBoard';
import SearchMember from './SearchMember';
import GroupMembers from './GroupMembers';
import { retrieveMessage } from '../actions/messageActions';
import jwt from 'jsonwebtoken';
import { getUserGroups,
         getGroupsCreatedByUser,
         getUsersInGroup } from '../actions/groupActions';

class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    const { getUserGroups, getGroupsCreatedByUser } = this.props.group;
    const {groups, groupsByUser} = this.props.group
    const groupId = this.props.groupSelectedId;
    const groupName = this.props.groupName;

    if(isAuthenticated){
      this.setState({
        sentBy: jwt.decode(localStorage.getItem('jwtToken')).id,
        priority_level: 'Normal',
      });
      this.props.getUserGroups({username: user.username});
      this.props.getGroupsCreatedByUser({userId: user.id});
    }

  }

  render(){
    const {groups, groupsByUser} = this.props.group;
    let id = this.props.params.groupid;
    let messageId = this.props.params.messageid;

    let groupName;
    let found = false;

    if(!groups || !groupsByUser) {
      return (
        <h4>Loading ...</h4>
      )
    }

    const groupArrays = groups.groups.map((group) => {
        if(group.id == id){
          groupName = group.groupName;
          found = true;
        }
    });

    if(!found){
        groupName = 'No Group Found';
        return (
          <h4>Loading ...</h4>
        );
    }

    return (
      <div className="content">
          <NavigationBarMenu />

          <div className="container-fluid">
              <div className="row">
                <div className="col-md-2">
                  <GroupMembers groupSelectedId={id} />
                </div>
                  <div className="col-md-6">
                    <MessageDetailBoard
                      groupSelectedId={id}
                      groupName={groupName}
                      messageId={messageId} />
                  </div>
                  <div className="col-md-4">
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
  retrieveMessage: React.PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
    message: state.message,
  }
}
export default connect(mapStateToProps,
                      {getUserGroups,
                       getGroupsCreatedByUser,
                       retrieveMessage})
                       (MessageBoard);
