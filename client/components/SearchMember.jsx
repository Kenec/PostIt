/* global localStorage */
// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { getUserGroups, getUserInfo, addUserToGroups,
  getUsersInGroupAction, searchAllUsers } from '../actions/groupActions';

/**
 * Search a user
 * @class SearchMember
 * @extends {Component}
 */
export class SearchMember extends Component {
  /**
   * Creates an instance of SearchMember
   * @constructor
   * @param {any} props
   * @memberof {SearchMember}
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
    this.onChange = this.onChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.decreaseOffset = this.decreaseOffset.bind(this);
    this.increaseOffset = this.increaseOffset.bind(this);
  }

  /**
   * Life cycle method to be called before a component mounts
   * @method componentWillMount
   * @return{void} void
   */
  componentWillMount() {
    this.setState({
      user: jwt.decode(localStorage.jwtToken).username,
      groupId: this.props.groupId
    });
  }

  /**
   * Handle onChange event
   * @method onChange
   * @param {object} event
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
    // This fires a action that searches for a user and return the result
    this.props.searchAllUsers({ username: userSearchName }, this.state.offset);
  }

  /**
   * Decrease the offset if it is greater than zero by 1
   * @method decreaseOffset
   * @param {object} event
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
   * Increase the offset by 1
   * @method increaseOffset
   * @param {object} event
   * @return {void} 
   */
  increaseOffset(event) {
    event.preventDefault();
    this.props.searchAllUsers({ username: this.state.username },
      this.state.offset + 1);
    const usersCount = this.props.group.searchedUsers.count;
    this.setState({
      errors: {},
      offset: this.state.offset < (usersCount / 5) ?
        this.state.offset + 1 : this.state.offset,
      togglePrevent: (usersCount / 5) - 1 <= (this.state.offset + 1) ?
        'none' : 'auto',
    });
  }

  /**
   * Add a user to the group
   * @method addUser
   * @param {object} event
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
  * Display the DOM component
  * @method render
  * @return {DOM} DOM Component
  */
  render() {
    const { errors, success } = this.state;
    const { groups, groupsBelonged, searchedUsers,
      usersInGroup } = this.props.group;

    if (!groups || !groupsBelonged) {
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
              autoComplete="off"
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
  group: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
  searchAllUsers: PropTypes.func.isRequired,
  addUserToGroups: PropTypes.func.isRequired,
  getUsersInGroupAction: PropTypes.func.isRequired,
};

/**
 * Map state to props
 * @function mapStateToProps
 * @param {object} state
 * @return {object} state objects 
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
  searchAllUsers,
  getUserInfo,
  addUserToGroups,
  getUsersInGroupAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMember);
