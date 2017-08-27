import React, { Component } from 'react';


class Footer extends Component {

  render(){
    return(
      <div className="footer">
          <div className="col-md-8"></div>
          <div className="col-md-4 pull-right bold">
            <span className="valign-wrapper">
              Copyright &copy; 2017 &nbsp;&nbsp;<b>Designed by Kene</b>
            </span>
          </div>
      </div>
    );
  }
}

export default Footer;
