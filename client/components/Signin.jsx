// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// import axios from 'axios';
import NavigationBar from './NavigationBar.jsx'; // eslint-disable-line
import { userSigninRequestAction } from '../actions/signinActions';
import { deleteFlashMessage } from '../actions/flashMessages';
import { getUserGroups } from '../actions/groupActions';
/**
 * @class Signin
 */
export class Signin extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
  onClick(event) {
    event.preventDefault();
    this.props.deleteFlashMessage(this.props.messages.id);
  }

  /**
   * 
   * @param {Event} event
   * @return {void} 
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.userSigninRequestAction(this.state)
      .then(
        () => {
          this.props.getUserGroups({ username: this.state.username });
          this.context.router.push('/dashboard');
        },
        ({ response }) => this.setState({
          errors: response.data,
          isLoading: false
        })
      );
  }

  /**
   * @return {DOM} DOM Component
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.context.router.push('/dashboard');
    }
    const { errors, isLoading } = this.state;

    const messages = this.props.messages.map(message =>
      (<div className="alert alert-success" key={message.id}>
        <button
          onClick={this.props.deleteFlashMessage(message.id)}
          className="close"
        ><span>&times;</span>
        </button>
        {message.text}
      </div>)
    );
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
                            PostIt is a messenger application that allows
                            you post messages to your created group.
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
                {messages}
                <div className="panel-heading"><h4>Login</h4></div>
                <div className="panel-body">
                  <div className="row">
                    {errors.message &&
                    <div className="alert alert-danger">
                      {errors.message}
                    </div>}
                    <form onSubmit={this.onSubmit} className="">
                      <div className="row">
                        <div className="input-field">
                          <input
                            type="text"
                            className="validate"
                            onChange={this.onChange}
                            value={this.state.username}
                            name="username"
                            id="username"
                            required
                          />
                          <label htmlFor="username">
                                        Username:
                          </label>
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
                        </div>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="btn btn-primary"
                        > Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="text-primary">
                    <br />
                    <div>
                      <Link to="signup">
                         Dont have an account? Sign up
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

Signin.propTypes = {
  userSigninRequestAction: React.PropTypes.func.isRequired,
  messages: React.PropTypes.array.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired,
  getUserGroups: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};
Signin.contextTypes = {
  router: React.PropTypes.object.isRequired
};
/**
 * 
 * @param {object} state
 * @return {object} state object 
 */
function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
    group: state.group,
    auth: state.userLoginReducer,
  };
}
export default connect(mapStateToProps,
  { userSigninRequestAction,
    deleteFlashMessage,
    getUserGroups
  })(Signin);

