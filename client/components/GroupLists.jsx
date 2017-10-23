// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserGroups,
  getAdminGroups } from '../actions/groupActions';
import { retrieveMessage } from '../actions/messageActions';

/**
 * @class GroupLists
 */
export class GroupLists extends Component {
  /**
   * @return {void}
   */
  componentWillMount() {
    // const { isAuthenticated, user } = this.props.auth;
  }
  /**
   * @return {DOM} DOM Component
   */
  render() {
    const { groups, groupsBelonged } = this.props.group;

    if (!groups || !groupsBelonged) {
      return (
        <h4>Loading ...</h4>
      );
    }
    groupsBelonged.map(group => (
      <li key={group.id} value={group.id}>
        <Link to="#">{group.groupName}</Link>
      </li>));
    const userGroups = groups.groups.map(group => (
      <Link to={`/group/${group.id}`} key={group.id}>
        <div className="well well-sm no_spacing">
          <span id={group.id}>{group.groupName}</span>
        </div>
      </Link>
    ));

    return (
      <div className="row">
        <div className="well well-sm blue lighten-2 no_spacing">
          <span className="white-text"><b>Groups</b></span>
          <span className="right">
            <Link to="/createGroup">
              <b>Add New</b>
            </Link>
          </span>
        </div>
        <div className="well well-sm group_board">
          <ul>
            {userGroups}
          </ul>
        </div>
      </div>
    );
  }
}
GroupLists.propTypes = {
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
  };
}
export default connect(mapStateToProps,
  { getUserGroups,
    getAdminGroups,
    retrieveMessage })(GroupLists);
