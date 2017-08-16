import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import  validateInput  from '../../server/shared/validations/signup';
import { checkForValidToken,
        updatePassword } from '../actions/forgotPasswordAction';

class ChangePassword extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      password:'',
      repassword: '',
      errors: {},
      success: '',
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // function to validate input
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid) {
      this.setState({errors})
    }

    return isValid;
  }
  // onChange method
  onChange(e){
    // reset state when a element changes its state
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // onSubmit function
  onSubmit(e){
    // prevent the browser from refreshing or carrying out another action
    e.preventDefault();
    // if the input field is valid
    if (this.isValid()) {
      // disable the submit button and clear error and success state
      this.setState({ errors: {}, success: '', isLoading:true });
      // get token from the props.params
      let token = this.props.params.token;
      // create a variable for updating password
      const passwordUpdateDetails = {
        password: this.state.password,
        token: token,
      }
      // dispatch updatePassword action with token and update password detail
      this.props.updatePassword(token, passwordUpdateDetails)
        .then(
          // if it return a success
          ({data}) => {
            this.setState({ success: data.message,  isLoading:false });
          },
          // if it returns error
          ({response}) => {
            this.setState({ errors: response.data,  isLoading:false });
          }
        )
        // catch an exception
        .catch((error) => {
          this.setState({ errors: error,  isLoading:false });
        })
    }
  }
  // before componentWillMount metthod
  componentWillMount(){
    // get token from the params and check if it a vdlid token
    let token = this.props.params.token;
    // dispatch an action to check for a valid token
    this.props.checkForValidToken(token).then(
      ({data}) => {
        // do nothing if the token is valid
      },
      ({response}) => {
        // redirect to recover password route if an invalid token is found
        this.context.router.push('/recoverpassword');
      }
    )
  }

  render(){
    const { errors, success } = this.state;
    return(
      <div>
        <NavigationBar />
        <div className="container">
            <div className="row">
                <div className="col-md-2">

                </div>
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
                    <div className="">

                    </div>
                      <div className="panel-heading">
                        <b>Change Password</b></div>
                      <div className="panel-body">

                          <form onSubmit={this.onSubmit}
                                className="" action="" method="">

                              <div className="form-group">
                                  <label htmlFor="password">Password:</label>
                                  <input type="password"
                                      className="form-control"
                                      onChange={this.onChange}
                                      value={this.props.password}
                                      name="password" required/>
                                  {errors.password &&
                                    <span className="help-block red-text">
                                      {errors.password}
                                    </span>}
                              </div>

                              <div className="form-group">
                                  <label htmlFor="repassword">
                                    Retype password:
                                  </label>
                                  <input type="password"
                                    className="form-control"
                                    onChange={this.onChange}
                                    value={this.props.repassword}
                                    name="repassword" required/>
                                  {errors.confirmPassword &&
                                    <span className="help-block red-text">
                                      {errors.confirmPassword}
                                    </span>}
                              </div>

                              <button type="submit"
                                disabled={this.state.isLoading}
                                name="forgotpassword_btn"
                                className="btn btn-primary">
                                  Change Password
                              </button>
                          </form>
                          <div  className="text-primary">
                            <br/>
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
                <div className="col-md-2">

                </div>
            </div>
        </div>
      </div>
    );
  }
}
ChangePassword.propTypes = {
  checkForValidToken: React.PropTypes.func.isRequired,
  updatePassword: React.PropTypes.func.isRequired
}
ChangePassword.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, {checkForValidToken, updatePassword})
                      (ChangePassword);
