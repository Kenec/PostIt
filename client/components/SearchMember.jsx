/* global localStorage */
// import
import React, { Component } from 'react';
import { Link } from 'react-router';
// import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { getUserGroups,
  getUserInfo,
  addUserToGroups,
  getUsersInGroupAction,
  searchAllUsers } from '../actions/groupActions';

  /**
   * @class SearchMember
   */
class SearchMember extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      username: '',
      isLoading: false,
      errors: {},
      success: '',
      userId: '',
      offset: 0,
      togglePrevent: 'auto',
    };
    // this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.decreaseOffset = this.decreaseOffset.bind(this);
    this.increaseOffset = this.increaseOffset.bind(this);
  }

  /**
   * @return{void} void
   */
  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.setState({
        user: jwt.decode(localStorage.getItem('jwtToken')).username,
        groupId: this.props.groupId
      });
    }
  }

  // /**
  //  * 
  //  * @param {Event} event
  //  * @return {void} void 
  //  */
  // onSubmit(event) {
  //   event.preventDefault();
  // }

  /**
   * 
   * @param {Event} event
   * @return {void} 
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      errors: {},
      success: '',
    });
    const userSearchName = event.target.value;
    // const userSearchInputName = event.target.name;
    // This fires a action that searches for a user and return the result
    this.props.searchAllUsers({ username: userSearchName }, this.state.offset);
  }
  /**
   * this method decrease the offset if it is greater than zero by 1
   * @param {Event} event
   * @return {void} 
   */
  decreaseOffset(event) {
    event.preventDefault();
    this.props.searchAllUsers({ username: this.state.username },
      this.state.offset > 0 ? this.state.offset - 1 : 0);
    const usersCount = this.props.group.searchedUsers.count;
    this.setState({
      errors: {},
      offset: this.state.offset > 0 ? this.state.offset - 1 : 0,
      togglePrevent: (usersCount / 5) < this.state.offset ? 'none' : 'auto',
    });
  }

  /**
   * this method will increase the offset by 1
   * @param {Event} event
   * @return {void} 
   */
  increaseOffset(event) {
    event.preventDefault();
    this.props.searchAllUsers({ username: this.state.username },
      this.state.offset + 1);
    // const { searchedUsers } = this.props.group;
    const usersCount = this.props.group.searchedUsers.count;
    this.setState({
      errors: {},
      offset: this.state.offset < (usersCount / 5) ? this.state.offset + 1 : this.state.offset,
      togglePrevent: (usersCount / 5) - 1 <= (this.state.offset + 1) ? 'none' : 'auto',
    });
  }

  /**
   * 
   * @param {Event} event
   * @return {void}
   */
  addUser(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      success: '',
    });
    const userId = event.target.userId.value;
    const username = event.target.username.value;
    const userEmail = event.target.userEmail.value;
    const userPhone = event.target.userPhone.value;
    const currentSearchedUser = {
      id: userId,
      username,
      email: userEmail,
      phone: userPhone
    };
    this.props.addUserToGroups(this.props.groupId, { userId }).then(
      ({ data }) => {
        const { usersInGroup } = this.props.group;
        const newSearchedUser = usersInGroup.concat(currentSearchedUser);
        this.props.getUsersInGroupAction(newSearchedUser);
        this.setState({
          success: 'User added successfully',
          isLoading: false
        });
      },
      ({ response }) => {
        this.setState({ errors: response.data, isLoading: false });
      }
    )
      .catch(() => {});
  }
  /**
 * @return {DOM} DOM Component
 */
  render() {
    const { groups, groupsByUser, searchedUsers, usersInGroup } = this.props.group;
    const { errors, success } = this.state;

    if (!groups || !groupsByUser) {
      return (
        <h2>Loading ...</h2>
      );
    }

    // Iterated over the array of objects of
    // the users returned. This is coming from the store
    let returnedUsers;
    if (searchedUsers) {
      returnedUsers = searchedUsers.rows.map(user => (
        <form onSubmit={this.addUser} key={user.id}>
          <div className="row">
            <p className="" >
              <span className="pull-left">{user.username}</span>
              <span className="pull-right">
                <input type="hidden" name="userId" value={user.id} />
                <input type="hidden" name="username" value={user.username} />
                <input type="hidden" name="userEmail" value={user.email} />
                <input type="hidden" name="userPhone" value={user.phone} />
                {(usersInGroup.filter(e => e.username === user.username).length > 0) ?
                  <button type="" disabled>Already a member</button> :
                  <button type="submit">Add</button>
                }
              </span>
            </p>
          </div>
        </form>
      ));
    }

    return (
      <div className="row">
        <div className="well well-sm blue-text text-darken-2 no_spacing">
          <b>ADD USER TO GROUP</b>
        </div>
        <form onSubmit={this.onSubmit} className="" action="" method="">
          <div className="form-group browser-default">
            <input
              onChange={this.onChange}
              value={this.state.username}
              type="text"
              placeholder="Type username"
              className="form-control browser-default"
              name="username"
            />
          </div>
        </form>
        <div>
          {errors.message && <span className="help-block red-text">
            <b>{errors.message}</b>
          </span>}
          {success && <span className="help-block green-text">
            <b>{success}</b>
          </span>}
          {(this.state.username === '' || !returnedUsers) ? '' : returnedUsers }
          {/* {returnedUsers && returnedUsers} */}
          {(this.state.username === '' || !returnedUsers) ? '' :
            (<ul className="pagination">
              <li className="waves-effect">
                <Link to="#" onClick={this.decreaseOffset}>Back</Link>
              </li>
              <li className="active">
                <Link to="#">{this.state.offset + 1}</Link>
              </li>
              <li className="waves-effect">
                <Link
                  to="#"
                  onClick={this.increaseOffset}
                  style={{ pointerEvents: this.state.togglePrevent }}
                >
                  Next
                </Link>
              </li>
            </ul>)
          }
        </div>
      </div>
    );
  }
}
SearchMember.propTypes = {
  group: React.PropTypes.object.isRequired,
  groupId: React.PropTypes.string.isRequired,
  searchAllUsers: React.PropTypes.func.isRequired,
  addUserToGroups: React.PropTypes.func.isRequired,
  getUsersInGroupAction: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};
/**
 * 
 * @param {object} state
 * @return {object} state objects 
 */
function mapStateToProps(state) {
  return {
    group: state.group,
    auth: state.userLoginReducer,
  };
}
export default connect(mapStateToProps,
  { getUserGroups,
    searchAllUsers,
    getUserInfo,
    addUserToGroups,
    getUsersInGroupAction })(SearchMember);
