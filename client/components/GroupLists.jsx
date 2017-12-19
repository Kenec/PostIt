// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { retrieveMessage } from '../actions/messageActions';
import { getUserGroups, getAdminGroups }
  from '../actions/groupActions';

/**
 * List all Groups
 * @class GroupLists
 * @extends {Component}
 */
export class GroupLists extends Component {
  /**
   * Life cycle method to be called before component mounts
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    // const { isAuthenticated, user } = this.props.auth;
  }

  /**
   * Displays the DOM component
   * @method render
   * @return {DOM} DOM Component
   */
  render() {
    const { groups, groupsBelonged } = this.props.group;
    if (!groups || !groupsBelonged) {
      return <h4>Loading ...</h4>;
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
            <Link to="/createGroup" className="add-new">
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
 * Map state to props
 * @function mapStateToProps
 * @param {object} state
 * @return {object} state object
 */
const mapStateToProps = state => (
  {
    group: state.group,
    auth: state.userLogin,
  }
);

/**
 * Map dispatch to props
 * @return {object} dispatch objects
 */
const mapDispatchToProps = {
  getUserGroups,
  getAdminGroups,
  retrieveMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupLists);
