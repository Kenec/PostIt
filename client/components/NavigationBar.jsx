// import
import React, { Component } from 'react';

class NavigationBar extends Component {

  render(){

    return(
      <div className="well container-fluid ">
          <div className="row">
              <div className="col-md-6 my_title">
                <img src="/images/postit.png" width="50px" height="50px"/>
                <strong className="text-info"><b>POSTIT</b></strong>
              </div>
              <div className="col-md-6 pull-right"></div>
          </div>

      </div>
    );
  }
}

export default NavigationBar;
