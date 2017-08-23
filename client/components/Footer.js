import React, { Component } from 'react';


class Footer extends Component {

  render(){
    return(
      <div className="footer">
          <div className="col-md-9"></div>
          <div className="col-md-3 right bold">
            <span className="valign-wrapper">
              &copy; <b>Designed by Kene &nbsp;&nbsp;&nbsp; 2017</b>
            </span>
          </div>
      </div>
    );
  }
}

export default Footer;
