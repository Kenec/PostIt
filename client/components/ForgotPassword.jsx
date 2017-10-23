// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar.jsx';
import validateInput from '../../server/shared/validations/validateInput';
import { forgotPasswordRequest } from '../actions/forgotPasswordAction';

/**
 * @class ForgotPassword
 */
export class ForgotPassword extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
      success: '',
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * 
   * @param {*} event 
   * @return {void} void
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * 
   * @param {*} event
   * @return {void} void 
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, success: '', isLoading: true });
      this.props.forgotPasswordRequest({ email: this.state.email })
        .then(
          ({ data }) => {
            this.setState({ success: data.message, isLoading: false });
          },
          ({ response }) => {
            this.setState({ errors: response.data, isLoading: false });
          }
        )
        .catch(() => {
          this.setState({ errors: {}, success: '', isLoading: false });
        });
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
                  <b>Recover Password</b></div>
                <div className="panel-body">

                  <form
                    onSubmit={this.onSubmit}
                    className=""
                    action=""
                    method=""
                  >

                    <div className="form-group">
                      <label htmlFor="email">Email address:</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.email}
                        name="email"
                        id="email"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={this.state.isLoading}
                      name="forgotpassword_btn"
                      className="btn btn-primary"
                    >
                                        Recover Password
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
ForgotPassword.propTypes = {
  forgotPasswordRequest: PropTypes.func.isRequired,
};

export default connect(null, { forgotPasswordRequest })(ForgotPassword);
