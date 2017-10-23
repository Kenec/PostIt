// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar.jsx';
import validateInput from '../../server/shared/validations/validateInput';
import { isValidToken,
  updatePassword } from '../actions/forgotPasswordAction';

/**
 * @class ChangePassword
 */
export class ChangePassword extends Component {
  /**
   * @constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repassword: '',
      errors: {},
      success: '',
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
    * @function componentWillMount
    * @return {void} void
    */
  componentWillMount() {
    // get token from the params and check if it a vdlid token
    const token = this.props.params.token;
    // dispatch an action to check for a valid token
    this.props.isValidToken(token).then(
      () => {
        // do nothing if the token is valid
      },
      () => {
        // redirect to recover password route if an invalid token is found
        this.context.router.push('/recoverpassword');
      }
    );
  }
  /**
   * @function onChange
   * @param {Event} event 
   * @return {void} void
   */
  onChange(event) {
    // reset state when a element changes its state
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * @function onSubmit
   * @param {Event} event
   * @return {void} void 
   */
  onSubmit(event) {
    // prevent the browser from refreshing or carrying out another action
    event.preventDefault();
    // if the input field is valid
    if (this.isValid()) {
      // disable the submit button and clear error and success state
      this.setState({ errors: {}, success: '', isLoading: true });
      // get token from the props.params
      const token = this.props.params.token;
      // create a variable for updating password
      const NewPassword = {
        password: this.state.password,
        token,
      };
      // dispatch updatePassword action with token and update password detail
      this.props.updatePassword(token, NewPassword)
        .then(
          // if it return a success
          ({ data }) => {
            this.setState({ success: data.message, isLoading: false });
          },
          // if it returns error
          ({ response }) => {
            this.setState({ errors: response.data, isLoading: false });
          }
        )
        // catch an exception
        .catch((error) => {
          this.setState({ errors: error, isLoading: false });
        });
    }
  }
  /**
   * @function isValid
   * @return { boolean } isValid
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @function render
   * @return {DOM} DOM component
   */
  render() {
    const { errors, success } = this.state;
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <p>
                {errors.message &&
                <span className="help-block red-text">
                  <b>{errors.message}</b>
                </span>
                }
                {success &&
                  <span className="help-block green-text">
                    <b>{success}</b>
                  </span>
                }
              </p>
              <div className="panel panel-info">
                <div className="" />
                <div className="panel-heading">
                  <b>Change Password</b></div>
                <div className="panel-body">

                  <form
                    onSubmit={this.onSubmit}
                    className=""
                    action=""
                    method=""
                  >

                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.password}
                        name="password"
                        required
                      />
                      {errors.password &&
                      <span className="help-block red-text">
                        {errors.password}
                      </span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="repassword">
                                    Retype password:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.repassword}
                        name="repassword"
                        required
                      />
                      {errors.confirmPassword &&
                      <span className="help-block red-text">
                        {errors.confirmPassword}
                      </span>}
                    </div>

                    <button
                      type="submit"
                      disabled={this.state.isLoading}
                      name="forgotpassword_btn"
                      className="btn btn-primary"
                    >
                                  Change Password
                    </button>
                  </form>
                  <div className="text-primary">
                    <br />
                    <div>
                      <Link to="signup">
                                  Dont have an account? Sign up
                      </Link>
                    </div>
                    <div><Link to="/">Sign in</Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2" />
          </div>
        </div>
      </div>
    );
  }
}
ChangePassword.propTypes = {
  isValidToken: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};
ChangePassword.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null,
  { isValidToken, updatePassword })(ChangePassword);
