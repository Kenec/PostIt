import React, { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { getUserGroups, getUserInfo, addUserToGroups, getGroupsCreatedByUser } from '../actions/groupActions';

class AddUserBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      username:'',
      user: jwt.decode(localStorage.getItem('jwtToken')).username,
      isLoading: false,
      errors: {},
      success: '',
      userId: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.username && this.state.groupId){
      this.setState({ errors: {}, success: '', userId:'', isLoading:true });
      this.props.getUserInfo({username: this.state.username}).then(
        ({data}) => {
          // Here you have verified that a user exist so dispatch the addUsertoGroupAction
          this.setState({
            userId: data.userid,
          });
          this.props.addUserToGroups(this.state.groupId,{userId: this.state.userId}).then(
            ({data}) => {
              this.setState({
                success: 'User added successfully',
              });
            },
            ({response}) => {
              this.setState({ errors: response.data});
            }
          )
          .catch((error) => {});
        },
        ( {response} ) => this.setState({ errors: response.data, isLoading: false })
      )
      .catch((error) => {});
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    const {groups, groupsByUser} = this.props.group
    const { errors, success } = this.state;

    if(!groups || !groupsByUser) {
      return (
        <h2>Loading ...</h2>
      )
    }

    //const optionsObj = groupsByUser;
    const options = groupsByUser.map((group) => {
      return <option key={group.id} value={group.id}>{group.groupName}</option>
    });

    return(
      <div className="row">
        <div className="page-title blue-text text-darken-2">ADD USER TO GROUP</div>
        {errors.message && <span className="help-block red-text"><b>{errors.message}</b></span>}
        {success && <span className="help-block green-text"><b>{success}</b></span>}
        <form onSubmit={this.onSubmit} className="" action="" method="">
            <div className="form-group">
                <label htmlFor="groups">Select Group:</label>

                <select onChange={this.onChange} value={this.props.groupId} className="form-control browser-default" name="groupId">
                    <option value="" disabled selected>Select a group</option>
                    {options}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input onChange={this.onChange} value={this.props.username} type="text" className="form-control browser-default" name="username"/>
            </div>
            <button type="submit" className="btn btn-primary">Add User</button>
        </form>
      </div>
    );
  }
}
AddUserBoard.propTypes = {
  getUserGroups: React.PropTypes.func.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,
  addUserToGroups: React.PropTypes.func.isRequired,
  getGroupsCreatedByUser: React.PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group
  }
}
export default connect(mapStateToProps, {getUserGroups, getUserInfo, addUserToGroups, getGroupsCreatedByUser})(AddUserBoard);
