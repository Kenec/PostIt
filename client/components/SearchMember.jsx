/* global localStorage */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
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
      searchQuery: '',
      pageCount: 0
    };
    this.onChange = this.onChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
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
      searchQuery: '',
      offset: 0,
    });
    const searchQuery = event.target.value;
    // This fires a action that searches for a user and return the result
    if (searchQuery) {
      this.props.searchAllUsers({ username: searchQuery },
        this.state.offset);
      this.setState({ searchQuery });
    }
  }

  /**
   * handles the pagination next and previous actions
   * @param {any} data
   * @return {void}
   */
  handlePagination(data) {
    const selected = data.selected;
    this.setState({ offset: selected });
    this.props.searchAllUsers({ username: this.state.searchQuery },
      selected);
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
    const user = {
      id: userId,
      username,
      email: userEmail,
      phone: userPhone
    };
    this.props.addUserToGroups(this.props.groupId, { userId }).then(
      () => {
        const { usersInGroup } = this.props.group;
        const newUser = usersInGroup.concat(user);
        this.props.getUsersInGroupAction(newUser);
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
      return <h2>Loading ...</h2>;
    }

    // Iterated over the array of objects of
    // the users returned. This is coming from the store
    let returnedUsers, pages;
    if (searchedUsers) {
      pages = Math.ceil(searchedUsers.count / 5);
      if (searchedUsers.rows.length > 0) {
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
                  {(usersInGroup.filter(users => users.username === user.username).length > 0) ?
                    <button type="" disabled>Already a member</button> :
                    <button type="submit">Add</button>
                  }
                </span>
              </p>
            </div>
          </form>
        ));
      } else {
        returnedUsers =
          <div className="text-danger"><b>No User Found</b></div>;
      }
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
            (<ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={<Link disabled>of &nbsp;&nbsp; {pages}</Link>}
              breakClassName={'active'}
              pageCount={pages}
              marginPagesDisplayed={0}
              pageRangeDisplayed={0}
              onPageChange={this.handlePagination}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />)
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
