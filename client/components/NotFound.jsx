// import
import React from 'react';
import { Link } from 'react-router';
import NavigationBar from './NavigationBar';

/**
 * @class Signin
 */
const NotFound = () =>
  (<div className="content">
    <NavigationBar />
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-7 col-md-offset-2 text-center">
          <h1>404 NOT FOUND</h1>
        </div>
        <span className="col-md-7 col-md-offset-2 center">
          <img alt="" src="/images/404.png" width="150px" height="150px" />
        </span>
        <span className="col-md-7 col-md-offset-2 text-center">
          <Link to="/dashboard">GET BACK HOME </Link>
        </span>
      </div>
    </div>
  </div>);

export default NotFound;
