/* global confirm alert */
/* global localStorage */
// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { getUserGroups,
  getUsersInGroupAction,
  getUsersInGroup,
  getuserGroupsAction,
  removeUserFromGroup } from '../actions/groupActions';
import { retrieveMessage } from '../actions/messageActions';

/**
 * @class GroupMembers
 */
class GroupMembers extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      groupMembers: [],
      removalApproval: false,
      message: ''
    };
    this.confirmAndRemoveUser = this.confirmAndRemoveUser.bind(this);
  }
  /**
   * @return {void}
   */
  componentWillMount() {
    this.getUser();
  }
  /**
   * @return{void}
   */
  getUser() {
    this.props.getUsersInGroup(this.props.groupSelectedId).then(
      ({ data }) => {
        this.props.getUsersInGroupAction(data.users);
        this.setState({ groupMembers: data.users });
      },
      ({ response }) => {
        this.setState({ errors: response.data });
      }
    );
  }
  /**
   * @param {number} id 
   * @param {object} payload
   * @return {void}  
   */
  removeUser(id, payload) {
    this.props.removeUserFromGroup(id, payload).then(
      ({ data }) => {
        this.setState({ message: data.message });
        this.getUser();
      },
      ({ response }) => {
        this.setState({ message: response.data.message });
        alert(response.data.message);
      },
    );
  }
  /**
   * @param {Event} event
   * @return {void}
   */
  confirmAndRemoveUser(event) {
    event.preventDefault();
    const username = event.target.name;
    const userId = event.target.id;
    if (confirm(`Do you want to remove ${username} from the Group`)) {
      const groupid = this.props.groupSelectedId;
      const removalPayLoad = {
        admin: jwt.decode(localStorage.getItem('jwtToken')).id,
        user: parseInt(userId, 10),
      };
      this.removeUser(groupid, removalPayLoad);
    }
  }

  /**
   * @return {void}
   */
  render() {
    const { groups, groupsBelonged, usersInGroup } = this.props.group;

    if (!groups || !groupsBelonged || !usersInGroup) {
      return (
        <h4>Loading ...</h4>
      );
    }

    const groupsMemberList = usersInGroup.map(groupMember => (
      <Link key={groupMember.id}>
        <div className="well well-sm no_spacing">
          <span id={groupMember.id}>{groupMember.username}</span>
          <span className="pull-right">
            <input
              onClick={this.confirmAndRemoveUser}
              type="button"
              name={groupMember.username}
              id={groupMember.id}
              value="x"
            />
          </span>
        </div>
      </Link>
    ));

    return (
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
  getUsersInGroup: React.PropTypes.func.isRequired,
  getUsersInGroupAction: React.PropTypes.func.isRequired,
  groupSelectedId: React.PropTypes.string.isRequired,
  group: React.PropTypes.object.isRequired,
  removeUserFromGroup: React.PropTypes.func.isRequired,
};

/**
 * 
 * @param {object} state
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
  { getUserGroups,
    getUsersInGroupAction,
    getuserGroupsAction,
    getUsersInGroup,
    retrieveMessage,
    removeUserFromGroup })(GroupMembers);
