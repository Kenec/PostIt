import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserGroups, getGroupsCreatedByUser } from '../actions/groupActions';
import { retrieveMessage } from '../actions/messageActions';

class ReceivedMessageBoard extends Component {

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
        <div className="page-title blue-text text-darken-2">
        <span>RECEIVED MESSAGES</span>
        <span className="pull-right">

        </span>
        </div>
        <div className="row well well-sm">
          <div className="col-md-4">
            <div className="form-group">
                  <label htmlFor="groups"><span className="black-text"><b>Select Group:</b></span></label>
                  <select className="form-control"  name="groupId">
                      {groupsBelongedList}
                  </select>
            </div>
          </div>

        </div>
        <table className="table highlight striped">
          <thead>
            <tr>
              <th><span className="glyphicon glyphicon-trash"></span></th>
              <th>Received From</th>
              <th>Messages</th>
              <th>Read By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" className="filled-in" id="1" />
                <label htmlFor="1"></label>
              </td>
              <td>Andela Fellows</td>
              <td>Hello Guys, Please who is in Abuja now?.... <a href="#">Read</a></td>
              <td><em><a href="#">Kene, Obi, Philip and 9 others</a></em></td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" className="filled-in" id="2" />
                <label htmlFor="2"></label>
              </td>
              <td>Classmates</td>
              <td>Hey! I want us to have a get together <a href="#">Read</a></td>
              <td><em><a href="#">Kene, Obi, Philip and 9 others</a></em></td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" className="filled-in" id="3" />
                <label htmlFor="3"></label>
              </td>
              <td>Football Team</td>
              <td>We shall be having our training on Sunday. Be punctual <a href="#">Read</a></td>
              <td><em><a href="#">Kene, Obi, Philip and 9 others</a></em></td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}
ReceivedMessageBoard.propTypes = {
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
export default connect(mapStateToProps, {getUserGroups, getGroupsCreatedByUser, retrieveMessage})(ReceivedMessageBoard);
