import React, { Component } from 'react';
import { Link } from 'react-router';

class ForgotPassword extends Component {

  render(){
    return(
      <div className="container">
          <div className="row">
              <div className="col-md-2">

              </div>
              <div className="col-md-8">
                <div className="panel panel-info">
                  <div className="">

                  </div>
                    <div className="panel-heading"><b>Recover Password</b></div>
                    <div className="panel-body">
                        <form className="" action="" method="POST">

                            <div className="form-group">
                                <label for="email">Email address:</label>
                                <input type="email" className="form-control"  name="email" id="email" required/>
                            </div>

                            <button type="submit" name="forgotpassword_btn" className="btn btn-primary">Recover Password</button>
                        </form>
                        <div  className="text-primary">
                          <br/>
                          <div><Link to="signup">Dont have an account? Sign up</Link></div>
                          <div><Link to="/">Sign in</Link></div>
                       </div>
                    </div>
                </div>
              </div>
              <div className="col-md-2">

              </div>
          </div>
      </div>
    );
  }
}

export default ForgotPassword;
