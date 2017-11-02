/* global localStorage */
// import
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { createGroup, getUserGroups } from '../actions/groupActions';

/**
 * Create Group Board
 * @class CreateGroupBoard
 * @extends {Component}
 */
export class CreateGroupBoard extends Component {
  /**
  * Creates an instance of CreateGroupBoard
  * @constructor
  * @param {any} props
  * @memberof {CreateGroupBoard}
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
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Life Cycle method to be called before a component mounts
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.setState({
      createdby: jwt.decode(localStorage.jwtToken).id,
    });
  }

  /**
   * Handles onChange event
   * @method onChange
   * @param {object} event
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Handles onSubmit event
   * @method onSubmit
   * @param {object} event
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, success: '', isLoading: true });
    this.props.createGroup(this.state)
      .then(
        () => {
          const { user } = this.props.auth;
          this.props.getUserGroups({ username: user.username });
          this.setState({
            success: `${this.state.groupName} Group created successfully!`,
            isLoading: false,
            groupName: ''
          });
        },
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
   * Displays the DOM component
   * @method render
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
                maxLength="15"
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
 * Map state to props
 * @function mapStateToProps
 * @param {object} state
 * @return {object} state object
 */
const mapStateToProps = state => (
  {
    auth: state.userLogin,
    group: state.group
  }
);

/**
 * Map dispatch to props
 * @return {object} dispatch objects
 */
const mapDispatchToProps = {
  createGroup,
  getUserGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupBoard);
