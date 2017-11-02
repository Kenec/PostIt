// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBarMenu from './NavigationBarMenu';
import MessageDetailBoard from './MessageDetailBoard';
import SearchMember from './SearchMember';
import GroupMembers from './GroupMembers';
import { retrieveMessage } from '../actions/messageActions';
import { getUserGroups, getAdminGroups } from '../actions/groupActions';

/**
 * Message Board container
 * @class MessageBoard
 * @extends {Component}
 */
export class MessageBoard extends Component {
  /**
   * Life Cycle method to be called before a component mounts
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    const { user } = this.props.auth;
    this.setState({
      sentBy: user.id,
      priorityLevel: 'Normal',
    });
    this.props.getUserGroups({ username: user.username });
    this.props.getAdminGroups({ userId: user.id });
  }

  /**
   * Display the DOM component
   * @method render
   * @return {DOM} DOM Component
   */
  render() {
    const { groups, groupsBelonged } = this.props.group;
    const id = this.props.params.groupid;
    const messageId = this.props.params.messageid;

    let groupName;
    let found = false;

    if (!groups || !groupsBelonged) {
      return <h4>Loading ...</h4>;
    }

    groups.groups.map((group) => {
      if (group.id === parseInt(id, 10)) {
        groupName = group.groupName;
        found = true;
      }
      return found;
    });

    if (!found) {
      groupName = 'No Group Found';
      return (
        this.context.router.push('/NotFound')
      );
    }

    return (
      <div className="content">
        <NavigationBarMenu />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <GroupMembers groupSelectedId={id} />
            </div>
            <div className="col-md-6">
              <MessageDetailBoard
                groupSelectedId={id}
                groupName={groupName}
                messageId={messageId}
              />
            </div>
            <div className="col-md-3">
              <SearchMember groupId={id} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

MessageBoard.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  getAdminGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

MessageBoard.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Map state to props
 * @function mapStateToProps
 * @param {any} state
 * @return {object} state object 
 */
const mapStateToProps = state => (
  {
    group: state.group,
    auth: state.userLogin,
    message: state.message,
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
