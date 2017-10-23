/* global localStorage */
// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { createGroup, getUserGroups } from '../actions/groupActions';

/**
 * @class CreateGroupBoard
 */
export class CreateGroupBoard extends Component {
  /**
   * @constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      errors: {},
      success: '',
      isLoading: false,
      username: jwt.decode(localStorage.jwtToken).username,
    };
    // bind the methods to this context
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @function componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    // deconstruct isAuthenticated and user from auth props
    const { isAuthenticated } = this.props.auth;
    // set createdby to user id from decoded token from the localStorage
    if (isAuthenticated) {
      this.setState({
        createdby: jwt.decode(localStorage.jwtToken).id,
      });
    }
  }

  /**
   * @function onChange
   * @param {Event} event 
   * @return {void}
   */
  onChange(event) {
    // reset state when the element changes
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @function onSubmit
   * @param {Event} event
   * @return {void}
   */
  onSubmit(event) {
    // prevent browser default action
    event.preventDefault();
    // disable the button and set error and success to empty
    this.setState({ errors: {}, success: '', isLoading: true });
    // dispatch createGroup action
    this.props.createGroup(this.state)
      .then(
        // if create group is succesful, dispatch an action to get
        // the created Group
        () => {
          // deconstruct variable from the store
          const { user } = this.props.auth;
          // dispatch an action to get the group created
          this.props.getUserGroups({ username: user.username });
          // set the success state with success message
          this.setState({
            success: `${this.state.groupName} Group created successfully!`,
            isLoading: false,
            groupName: ''
          });
        },
        // if error, then set error state with the content of the
        // error
        ({ response }) => {
          this.setState({
            errors: response.data,
            isLoading: false,
            groupName: ''
          });
        }
      );
  }

  /**
   * @function render
   * @return {DOM} DOM Component
   */
  render() {
    const { errors, success } = this.state;

    return (

      <div className="row">
        <div className="">
          <div className="page-title blue-text text-darken-2">
              CREATE NEW GROUP
          </div>
          {errors.message && <span className="help-block red-text">
            <b>{errors.message}</b></span>}
          {success && <span className="help-block green-text">
            <b>{success}</b>
          </span>}

          <form onSubmit={this.onSubmit} className="" action="" method="">
            <div className="">
              <input
                type="text"
                name="groupName"
                onChange={this.onChange}
                value={this.state.groupName}
                className="form-control"
                placeholder="Enter New Group Name"
                required
              />
            </div>
            <div className="">
              <button
                disabled={this.state.isLoading}
                className="btn"
                type="submit"
              >Add Group</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
CreateGroupBoard.propTypes = {
  createGroup: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
/**
 * @function mapStateToProps
 * @param {*} state 
 * @return {object} state object
 */
function mapStateToProps(state) {
  return {
    auth: state.userLogin,
    group: state.group
  };
}
export default connect(mapStateToProps,
  { createGroup, getUserGroups })(CreateGroupBoard);
