import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';

import { userSignupRequest } from '../actions/signupActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email:'',
      phone:'',
      password: '',
      repassword:'',
      errors: {},
      success: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({ errors: {}, success: {} });
    this.props.userSignupRequest(this.state)
      .then(
        () => {
          browserHistory.push('/');
        },
        ( {response} ) => this.setState({ errors: response.data })
      )
      .catch((error) => {});
  }

  render(){
    const { errors } = this.state;
    const { userSignupRequest } = this.props;
    return(
      <div className="container-fluid">
          <div className="row">
              <div className="col-md-1">

              </div>
              <div className="col-md-6">
                  <div className="row">
                    <h3 className="">Welcome To PostIt App<hr/></h3>
                    <div>
                        <img src="images/postman.gif" className="image" alt="Postman" width="180px" height="190px"/>
                        <span className="big-font">
                          PostIt is a messenger application that allows you post messages to your created group.
                          <b>PostIt </b>
                          always deliver your messages on time.
                        </span><hr/>
                    </div>
                  </div>
              </div>
              <div className="col-md-1">

              </div>

              <div className="col-md-4">

                <div className="panel panel-info">
                  <div className="">

                  </div>
                    <div className="panel-heading"><h4>Signup</h4></div>
                    <div className="panel-body">
                        {errors.message && <span className="help-block red-text"><b>{errors.message}</b></span>}
                        <div className='row'>
                          <form onSubmit={this.onSubmit} className="" action="" method="">
                              <div className='row'>
                                <div className="input-field">
                                    <input type="text" className="validate" name="username" onChange={this.onChange} value={this.props.username} placeholder="Enter your username"  id="username" required/>
                                    <label htmlFor="username">Username:</label>
                                </div>

                                <div className="input-field">
                                    <input type="email" className="validate" name="email" onChange={this.onChange} value={this.props.email} placeholder="Enter your email"  id="email" required/>
                                    <label htmlFor="email">Email:</label>
                                </div>

                                <div className="input-field">
                                    <input type="text" className="validate" name="phone" onChange={this.onChange} value={this.props.phone} placeholder="Enter your phone"  id="phone" required/>
                                    <label htmlFor="phone">Phone:</label>
                                </div>

                                <div className="input-field">
                                    <input type="password" name="password" onChange={this.onChange} value={this.props.password} placeholder="Enter your password" className="validate" id="pwd" required/>
                                    <label htmlFor="pwd">Password:</label>
                                </div>

                                <div className="input-field">
                                    <input type="password" name="repassword" onChange={this.onChange} value={this.props.repassword} placeholder="Enter your password again" className="validate" id="repwd" required/>
                                    <label htmlFor="repwd">Confirm Password:</label>
                                </div>
                                <button type="submit" name="signup_btn" className="btn btn-primary">Signup</button>
                              </div>
                            </form>
                        </div>
                        <div  className="text-primary">

                          <div><Link to="/">Already have an account? Sign in</Link></div>
                          <div><Link to="recoverpassword">Forgot Password?</Link></div>
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
  userSignupRequest: React.PropTypes.func.isRequired
}
Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default connect((state) => { return {}}, {userSignupRequest})(Signup);
