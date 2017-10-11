// import
import React, { Component } from 'react';
import { Link } from 'react-router';
// import axios from 'axios';
import { connect } from 'react-redux';

import NavigationBar from './NavigationBar.jsx';// eslint-disable-line
import { userSignupRequest } from '../actions/signupActions';
import validateInput from '../../server/shared/validations/validateInput';
import { addFlashMessage } from '../actions/flashMessages';

/**
 * @class Signup
 */
export class Signup extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phone: '',
      password: '',
      repassword: '',
      errors: {},
      success: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * 
   * @param {Event} event
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * 
   * @param {Event} event
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, success: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
        .then(
          () => {
            this.props.addFlashMessage({
              type: 'success',
              text: `You signed up successfully.
                      Enter your username and password to login`
            });
            this.context.router.push('/');
          },
          ({ response }) => this.setState({
            errors: response.data, isLoading: false
          })
        )
        .catch(() => {});
    }
  }

  /**
   * @return {boolean} isValid
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @return {DOM} DOM Component
   */
  render() {
    const { errors } = this.state;

    return (
      <div>
        <NavigationBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-6">
              <div className="row">
                <h3 className="">Welcome To PostIt App<hr /></h3>
                <div>
                  <img
                    src="/images/postman.gif"
                    className="image"
                    alt="Postman"
                    width="180px"
                    height="190px"
                  />
                  <span className="big-font">
                     PostIt is a messenger application that allows you
                     post messages to your created group.
                    <b> PostIt </b>
                       always deliver your messages on time.
                  </span><hr />
                </div>
              </div>
            </div>
            <div className="col-md-1" />

            <div className="col-md-4">

              <div className="panel panel-info">
                <div className="" />
                <div className="panel-heading"><h4>Signup</h4></div>
                <div className="panel-body">
                  {errors.message && <span
                    className="help-block red-text"
                  >
                    <b>{errors.message}</b>
                  </span>}
                  <div className="row">
                    <form
                      onSubmit={this.onSubmit}
                      className=""
                      action=""
                      method=""
                    >
                      <div className="row">
                        <div className="input-field">
                          <input
                            type="text"
                            className="validate"
                            name="username"
                            onChange={this.onChange}
                            value={this.state.username}
                            id="username"
                            required
                          />
                          <label htmlFor="username">
                             Username:
                          </label>
                          {errors.username &&
                          <span className="help-block red-text">
                            {errors.username}
                          </span>}
                        </div>

                        <div className="input-field">
                          <input
                            type="email"
                            className="validate"
                            name="email"
                            onChange={this.onChange}
                            value={this.state.email}
                            id="email"
                            required
                          />
                          <label htmlFor="email">Email:</label>
                          {errors.email && <span
                            className="help-block red-text"
                          >
                            {errors.email}
                          </span>}
                        </div>

                        <div className="input-field">
                          <input
                            type="text"
                            className="validate"
                            name="phone"
                            onChange={this.onChange}
                            value={this.state.phone}
                            id="phone"
                            required
                          />
                          <label htmlFor="phone">Phone:</label>
                          {errors.phone && <span
                            className="help-block red-text"
                          >
                            {errors.phone}
                          </span>}
                        </div>

                        <div className="input-field">
                          <input
                            type="password"
                            name="password"
                            onChange={this.onChange}
                            value={this.state.password}
                            className="validate"
                            id="pwd"
                            required
                          />
                          <label htmlFor="pwd">Password:</label>
                          {errors.password &&
                          <span
                            className="help-block red-text"
                          >
                            {errors.password}
                          </span>}
                        </div>

                        <div className="input-field">
                          <input
                            type="password"
                            name="repassword"
                            onChange={this.onChange}
                            value={this.state.repassword}
                            className="validate"
                            id="repwd"
                            required
                          />

                          <label htmlFor="repwd">
                            Confirm Password:
                          </label>
                          {errors.confirmPassword && <span
                            className="help-block red-text"
                          >
                            {errors.confirmPassword}
                          </span>}
                        </div>
                        <button
                          type="submit"
                          disabled={this.state.isLoading}
                          name="signup_btn"
                          className="btn btn-primary"
                        >
                            Signup
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="text-primary">
                    <div>
                      <Link to="/">
                         Already have an account? Sign in
                      </Link>
                    </div>
                    <div>
                      <Link to="recoverpassword">
                          Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};
Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default connect(null, { userSignupRequest, addFlashMessage })(Signup);
