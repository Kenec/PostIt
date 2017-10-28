// import
import React from 'react';

/**
 * Display the copyright and designer
 * @method Footer
 * @return {DOM} DOM Component
 */
export const Footer = () => (
  <div className="footer">
    <div className="col-md-8" />
    <div className="col-md-4  bold pad-footer-text">
      <span className="pull-right valign-wrapper">
        <span className="padding-right">Copyright &copy; 2017</span>
        <b className="padding-right">Designed by Kene</b>
      </span>
    </div>
  </div>
);

export default Footer;
