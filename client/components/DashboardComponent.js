import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserGroups, getGroupsCreatedByUser } from '../actions/groupActions';
import { retrieveMessage } from '../actions/messageActions';

class DashboardComponent extends Component {

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;

  }

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
      return <option key={group.id} value={group.id}>{group.groupName}</option>
    });

    return(
      <div className="row">
        <div className="blue-text text-darken-2">
        <div className="well well-sm"><b>NOTIFICATIONS</b></div>
        <span className="pull-right">

        </span>
        </div>
        <div className="row well well-sm">
          <div className="col-md-4">
            <div className="form-group">
                <p>You have no notifcation</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
DashboardComponent.propTypes = {
  getUserGroups: React.PropTypes.func.isRequired,
  getGroupsCreatedByUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  retrieveMessage: React.PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
  }
}
export default connect(mapStateToProps, {getUserGroups, getGroupsCreatedByUser, retrieveMessage})(DashboardComponent);
