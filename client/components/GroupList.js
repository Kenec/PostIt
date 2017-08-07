import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserGroups, getGroupsCreatedByUser } from '../actions/groupActions';

class GroupList extends Component {

  render(){
    const {groups, groupsByUser} = this.props.group
    if(!groups || !groupsByUser) {
      return (
        <h4>Loading ...</h4>
      )
    }
    const groupsCreatedList = groupsByUser.map((group) => {
      return <li key={group.id} value={group.id}><a href="#">{group.groupName}</a></li>
    });
    const groupsBelongedList = groups.groups.map((group) => {
      return <li key={group.id} value={group.id}><a href="#">{group.groupName}</a></li>
    });
    return(
      <div>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header blue lighten-2 white-text"><b>Groups Belonged To</b></div>
            <div className="collapsible-body">
              <ul>
                {groupsBelongedList}
              </ul>
            </div>
          </li>
          <li>
            <div className="collapsible-header  blue lighten-2 white-text"><b>Groups Created</b></div>
            <div className="collapsible-body">
              <ul>
                {groupsCreatedList}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

GroupList.propTypes = {
  getUserGroups: React.PropTypes.func.isRequired,
  getGroupsCreatedByUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
  }
}

export default connect(mapStateToProps, {getUserGroups, getGroupsCreatedByUser})(GroupList);
