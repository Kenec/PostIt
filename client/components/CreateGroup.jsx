// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import NavigationBarMenu from './NavigationBarMenu';
import LeftSideGroupMenu from './LeftSideGroupMenu';
import CreateGroupBoard from './CreateGroupBoard';

// CreateGroup Component
class CreateGroup extends Component {
  // constructor
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="content">
          <NavigationBarMenu />

          <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <LeftSideGroupMenu />
                </div>
                  <div className="col-md-7">
                    <CreateGroupBoard />
                  </div>
                  <div className="col-md-2">

                </div>
              </div>
          </div>

      </div>
    );
  }
}

export default CreateGroup;
