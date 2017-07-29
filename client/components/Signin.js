import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';
import { userSigninRequestAction } from '../actions/signinActions';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
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
     this.setState({ errors: {}, isLoading: true});
     this.props.userSigninRequestAction(this.state)
      .then(
        (res) => this.context.router.push('/message'),
        ({response}) => this.setState({
          errors: response.data,
          isLoading: false
        })
      );
  }

  render(){
    const { username, password, errors, isLoading } = this.state;
    return(
      <div>
        <NavigationBar/>
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
                      <div className="panel-heading"><h4>Login</h4></div>
                      <div className="panel-body">
                          <div className='row'>
                            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                              <form onSubmit={this.onSubmit} className="" action="" method="">
                                <div className='row'>
                                  <div className="input-field">
                                      <input type="text" className="validate" onChange={this.onChange} value={this.state.username} name="username" placeholder="Enter your username"  id="username" required/>
                                      <label htmlFor="username">Username:</label>
                                  </div>

                                  <div className="input-field">
                                      <input type="password" name="password" onChange={this.onChange} value={this.state.password} placeholder="Enter your password" className="validate" id="pwd" required/>
                                      <label htmlFor="pwd">Password:</label>
                                  </div>
                                  <button type="submit" name="signin_btn" disabled={isLoading} className="btn btn-primary">Login</button>
                                </div>
                              </form>
                          </div>
                          <div  className="text-primary">
                            <br/>
                            <div><Link to="signup">Dont have an account? Sign up</Link></div>
                            <div><Link to="recoverpassword">Forgot Password?</Link></div>
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
  userSigninRequestAction: React.PropTypes.func.isRequired
}
Signin.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { userSigninRequestAction })(Signin);
