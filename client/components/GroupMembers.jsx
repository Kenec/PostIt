/* global localStorage */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { retrieveMessage } from '../actions/messageActions';
import { getUserGroups, getUsersInGroup, removeGroupUser }
  from '../actions/groupActions';

/**
 * Display Group members
 * @class GroupMembers
 * @extends {Component}
 */
export class GroupMembers extends Component {
  /**
   * Create an instance of GroupMembers
   * @param {any} props
   * @memberof {GroupMembers}
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      removalApproval: false,
      message: ''
    };
    this.confirmRemoval = this.confirmRemoval.bind(this);
  }

  /**
   * Life cycle method to be called before a component mounts
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.getUser();
  }

  /**
   * Get users in a Group
   * @method getUser
   * @return {void}
   */
  getUser() {
    this.props.getUsersInGroup(this.props.groupSelectedId);
  }

  /**
   * Remove user from a Group
   * @method removeUser
   * @param {number} id
   * @param {object} userDetail
   * @return {void}
   */
  removeUser(id, userDetail) {
    this.props.removeGroupUser(id, userDetail).then(
      ({ data }) => {
        this.setState({ message: data.message });
        this.getUser();
        swal('Success', data.message, 'success');
      },
      ({ response }) => {
        this.setState({ message: response.data.message });
        swal('Error!', response.data.message, 'error');
      },
    );
  }

  /**
   * Confirm removal of a user from a Group
   * @method confirmRemoval
   * @param {object} event
   * @return {void}
   */
  confirmRemoval(event) {
    event.preventDefault();
    const username = event.target.name;
    const userId = event.target.id;
    const confirm = swal(`Do you want to remove  ${username} from the Group`, {
      buttons: { cancel: true, confirm: true, },
    });
    confirm.then((response) => {
      if (response) {
        const groupId = this.props.groupSelectedId;
        const removalPayLoad = {
          admin: jwt.decode(localStorage.jwtToken).id,
          user: parseInt(userId, 10),
        };
        this.removeUser(groupId, removalPayLoad);
      }
    });
  }

  /**
   * Displays the DOM component
   * @method render
   * @return {DOM} DOM Component
   */
  render() {
    const { groups, groupsBelonged, usersInGroup } = this.props.group;
    if (!groups || !groupsBelonged || !usersInGroup) {
      return <h4>Loading ...</h4>;
    }
    const groupsMemberList = usersInGroup.map(groupMember => (
      <Link key={groupMember.id}>
        <div className="well well-sm no_spacing">
          <span id={groupMember.id}>{groupMember.username}</span>
          <span className="pull-right">
            <input
              onClick={this.confirmRemoval}
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
  getUsersInGroup: PropTypes.func.isRequired,
  groupSelectedId: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  removeGroupUser: PropTypes.func.isRequired,
};

/**
 * Map state to props
 * @function mapStateToProps
 * @param {object} state
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
  getUserGroups,
  getUsersInGroup,
  retrieveMessage,
  removeGroupUser
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
