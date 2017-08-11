import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserGroups, getUsersInGroupAction, getUsersInGroup, getuserGroupsAction } from '../actions/groupActions';
import { retrieveMessage } from '../actions/messageActions';

class GroupMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      groupMembers: [],
    }
  }
  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    this.props.getUsersInGroup(this.props.groupSelectedId).then(
      ({data}) => {
        this.props.getUsersInGroupAction(data.users);
        this.setState({ groupMembers: data.users});
      },
      ({response}) => {
        this.setState({ errors: response.data});
      }
    );

  }
  render(){

    const {groups, groupsByUser, usersInGroup} = this.props.group;

    if(!groups || !groupsByUser || !usersInGroup) {
      return (
        <h4>Loading ...</h4>
      )
    }

    const groupsMemberList = usersInGroup.map((groupMember) => {
      return(
        <Link to={'/user/'+groupMember.id} key={groupMember.id}>
          <div className="well well-sm no_spacing">
            <span id={groupMember.id}>{groupMember.username}</span>
          </div>
        </Link>
      )
    });

    return(
      <div className="row">
          <div className="well well-sm blue lighten-2 no_spacing">
            <span className="white-text"><b>Group Members</b></span>
          </div>
          <div className="well well-sm group_board">
            <ul>
              {groupsMemberList}
            </ul>
          </div>
      </div>
    );
  }
}
GroupMembers.propTypes = {
  getUserGroups: React.PropTypes.func.isRequired,
  getUsersInGroup: React.PropTypes.func.isRequired,
  getUsersInGroupAction: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  retrieveMessage: React.PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
    message: state.message
  }
}
export default connect(mapStateToProps, {getUserGroups, getUsersInGroupAction, getuserGroupsAction, getUsersInGroup, retrieveMessage})(GroupMembers);
