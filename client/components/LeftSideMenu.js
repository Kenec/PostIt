import React, { Component } from 'react';
import { Link } from 'react-router';

class LeftSideMenu extends Component {

  render(){
    return(
      <div>
        <div className="side-menu"><Link to="composeMessage"><button className="btn red darken-3 btn-block" type="button" name="button">Compose</button></Link></div>
        <div className="side-menu"><Link to="message">Inbox (5)</Link></div>
        <div className="side-menu"><Link to="sentMessage">Sent Message</Link></div>
        <div className="side-menu"><Link to="archiveMessage">Archive Message</Link></div>
      </div>
    );
  }
}

export default LeftSideMenu;
