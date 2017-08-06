import React, { Component } from 'react';
import { Link } from 'react-router';

class GroupInfoBoard extends Component {

  render(){
    return(
      <div className="row">
        <div className="page-title ">
        <span className="blue-text text-darken-2">GROUP ANDELA FELLOWS</span>
        <span className="pull-right"><em>Created by Kene</em></span>
        </div>

        <div className="members_board">
            <div className=""><h3>19 Members</h3></div>
            <ul>
              <li>Philip</li>
              <li>Kene</li>
              <li>Tobi</li>
              <li>Solomon</li>
            </ul>
            <p><Link to="addUser">Invite More Friend</Link></p>
        </div>

      </div>
    );
  }
}

export default GroupInfoBoard;
