import React, { Component } from 'react';
import { Link } from 'react-router';

class Signin extends Component {

  render(){
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
                        </span>
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
                            <form className="" action="" method="">
                              <div className='row'>
                                <div className="input-field">
                                    <input type="text" className="validate" placeholder="Enter your username"  id="username" required/>
                                    <label for="username">Username:</label>
                                </div>

                                <div className="input-field">
                                    <input type="password" name="password" placeholder="Enter your password" className="validate" id="pwd" required/>
                                    <label for="pwd">Password:</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
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
    );
  }
}

export default Signin;
