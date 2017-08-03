import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getUserGroups, getGroupsCreatedByUser } from '../actions/groupActions';

class ComposeMessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      groupName: '',
      Message: '',
      priority_level: '',
      sentBy: jwt.decode(localStorage.getItem('jwtToken')).id,
      errors: {},
      success: '',
      isLoading: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render(){
    const {groups, groupsByUser} = this.props.group

    if(!groups || !groupsByUser) {
      return (
        <h2>Loading ...</h2>
      )
    }

    const options = groupsByUser.map((group) => {
      return <option key={group.id} value={group.id}>{group.groupName}</option>
    });

    return(
        <div className="row">
          <div className="page-title blue-text text-darken-2">SEND MESSAGE</div>
          <form onSubmit={this.onSubmit} className="" action="" method="">
              <div className="form-group">
                  <label htmlFor="groups"><span className="black-text"><b>Select Group:</b></span></label>
                  <select className="form-control" onChange={this.onChange} value={this.props.groupId} name="groupId">
                      <option value="" selected disabled>Select a group</option>
                      {options}
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="message_priority"><span className="black-text"><b>Message Priority:</b></span></label>
                  <select onChange={this.onChange} value={this.props.priority_level} className="form-control" name="priority_level">
                      <option value="" selected disabled>Choose Message Priority</option>
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Critical">Critical</option>
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="message"><span className="black-text"><b>Message:</b></span></label>
                  <textarea onChange={this.onChange} value={this.props.priority_level} name="Message" className="form-control" rows="5" id="message"></textarea>
              </div>

              <button type="submit" disabled={this.state.isLoading} className="btn btn-primary">Send Message</button>
          </form>
        </div>
    );
  }
}
ComposeMessageBoard.propTypes = {
  getGroupsCreatedByUser: React.PropTypes.func.isRequired,
  getUserGroups: React.PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group
  }
}
export default connect(mapStateToProps, {getGroupsCreatedByUser, getUserGroups})(ComposeMessageBoard);
