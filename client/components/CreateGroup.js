import React, { Component } from 'react';
import { Link } from 'react-router';
import NavigationBarMenu from './NavigationBarMenu';
import LeftSideMenu from './LeftSideMenu';
import GroupList from './GroupList';
import CreateGroupBoard from './CreateGroupBoard';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="content">
          <NavigationBarMenu />

          <div className="container-fluid">
              <div className="row">
                <div className="col-md-2">
                  <LeftSideMenu />
                </div>
                  <div className="col-md-8">
                    <CreateGroupBoard />
                  </div>
                  <div className="col-md-2">
                  <GroupList />
                </div>
              </div>
          </div>

      </div>
    );
  }
}

export default CreateGroup;
