// import
import React from 'react';
import postitImage from '../images/postit.png';

/**
 * Navigation Bar
 * @function NavigationBar
 * @return{DOM} DOM Component
 */
const NavigationBar = () => (
  <div className="well container-fluid ">
    <div className="row">
      <div className="col-md-6 my_title">
        <img alt="" src={postitImage} width="50px" height="50px" />
        <strong className="text-info"><b>POSTIT</b></strong>
      </div>
      <div className="col-md-6 pull-right" />
    </div>
  </div>
);


export default NavigationBar;
