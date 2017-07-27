import React, { Component } from 'react';
import { Link } from 'react-router';

class NavigationBarMenu extends Component {

  render(){

    return(
      <div className="well container-fluid ">
          <div className="row">
              <div className="col-md-8 my_title">
                <img src="images/postit.png" width="50px" height="50px"/>
                <strong className="text-info"><b>POSTIT</b></strong>
              </div>
              <div className="col-md-4 right-align">
                <a href="#"><span className="glyphicon glyphicon-user">&nbsp;</span>Welcome Kene!</a>
                <a href="#">&nbsp;&nbsp;&nbsp;Logout</a>
              </div>
              <div className="row">
                <div className="col-md-6">

                </div>
                <div className="col-md-6 right-align">
                  <div className="btn-group">
                    <button type="button" className=""><Link to="message"><span className="glyphicon glyphicon-envelope"></span><b> Message </b></Link></button>
                    <button type="button" className=""><Link to="archiveMessage"><span className="glyphicon glyphicon-trash"></span><b> Archive </b></Link></button>
                    <button type="button" className=""><Link to="createGroup"><span className="glyphicon glyphicon-lock"></span><b> Create Group </b></Link></button>
                    <button type="button" className=""><Link to="addUser"><span className="glyphicon glyphicon-plus"></span><b> Add Member </b></Link></button>
                  </div>
                </div>
              </div>
          </div>
        </div>
    );
  }
}

export default NavigationBarMenu;
