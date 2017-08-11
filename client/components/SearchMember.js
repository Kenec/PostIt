import React, { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { getUserGroups, getUserInfo, addUserToGroups, getUsersInGroupAction, searchAllUsers } from '../actions/groupActions';

class SearchMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      username:'',
      isLoading: false,
      errors: {},
      success: '',
      userId: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      this.setState({
        user: jwt.decode(localStorage.getItem('jwtToken')).username,
        groupId: this.props.groupId
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      errors: {},
      success: '',
    });
    let userSearchName = e.target.value;
    let userSearchInputName = e.target.name;
    // This fires a action that searches for a user and return the result
    this.props.searchAllUsers({username: userSearchName});
  }

  addUser(e){
    e.preventDefault();
      this.setState({
        errors: {},
        success: '',
      });
      const userId = e.target.userId.value;
      const username = e.target.username.value;
      const userEmail = e.target.userEmail.value;
      const userPhone = e.target.userPhone.value;
      const currentSearchedUser = {
        id: userId,
        username: username,
        email: userEmail,
        phone: userPhone
      }
      this.props.addUserToGroups(this.props.groupId,{userId: userId}).then(
        ({data}) => {
          const {usersInGroup} = this.props.group;
          const newSearchedUser = usersInGroup.concat(currentSearchedUser);
          this.props.getUsersInGroupAction(newSearchedUser);
          this.setState({
            success: 'User added successfully',
            isLoading: false
          });
        },
        ({response}) => {
          this.setState({ errors: response.data, isLoading: false});
        }
      )
      .catch((error) => {});

  }

  render(){
    const {groups, groupsByUser, searchedUsers} = this.props.group;
    const { errors, success } = this.state;

    if(!groups || !groupsByUser) {
      return (
        <h2>Loading ...</h2>
      )
    }

    //Iterated over the array of objects of the users returned. This is coming from the store
    let returnedUsers;
    if(searchedUsers){
        returnedUsers = searchedUsers.map((user) => {
          return (
            <form onSubmit={this.addUser} key={user.id}>
            <div className='row'>
              <p className='' >
                  <span className='pull-left'>{user.username}</span>
                  <span className='pull-right'>
                      <input type='hidden' name='userId' value={user.id} />
                      <input type='hidden' name='username' value={user.username} />
                      <input type='hidden' name='userEmail' value={user.email} />
                      <input type='hidden' name='userPhone' value={user.phone} />
                      <button type='submit' className=''>Add</button>
                  </span>
              </p>
            </div>
          </form>)
      });
    }

    return(
      <div className="row">
        <div className="well well-sm blue-text text-darken-2 no_spacing"><b>ADD USER TO GROUP</b></div>
        <form onSubmit={this.onSubmit} className="" action="" method="">
            <div className="form-group browser-default">
                <input onChange={this.onChange} value={this.state.username} type="text" placeholder="Type username" className="form-control browser-default" name="username"/>
            </div>
        </form>
        <div>
          {errors.message && <span className="help-block red-text"><b>{errors.message}</b></span>}
          {success && <span className="help-block green-text"><b>{success}</b></span>}
          {returnedUsers && returnedUsers}
        </div>
      </div>
    );
  }
}
SearchMember.propTypes = {
  getUserGroups: React.PropTypes.func.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,
  searchAllUsers: React.PropTypes.func.isRequired,
  addUserToGroups: React.PropTypes.func.isRequired,
  getUsersInGroupAction: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
  }
}
export default connect(mapStateToProps, {getUserGroups, searchAllUsers, getUserInfo, addUserToGroups, getUsersInGroupAction})(SearchMember);
