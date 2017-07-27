import React, { Component } from 'react';


class GroupList extends Component {

  render(){
    return(
      <div>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header blue lighten-2 white-text"><b>Groups Belonged To</b></div>
            <div className="collapsible-body">
              <ul>
                <li><a href="#">Andela Fellows</a></li>
                <li><a href="#">Football Team</a></li>
                <li><a href="#">Classmates</a></li>
              </ul>
            </div>
          </li>
          <li>
            <div className="collapsible-header  blue lighten-2 white-text"><b>Groups Created</b></div>
            <div className="collapsible-body">
              <ul>
                <li><a href="#">Andela Fellows</a></li>
                <li><a href="#">Football Team</a></li>
                <li><a href="#">Classmates</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default GroupList;
