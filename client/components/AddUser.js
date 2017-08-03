import React, { Component } from 'react';
import { Link } from 'react-router';
import NavigationBarMenu from './NavigationBarMenu';
import LeftSideMenu from './LeftSideMenu';
import GroupList from './GroupList';
import AddUserBoard from './AddUserBoard';

import { connect } from 'react-redux';
import { getUserGroups } from '../actions/groupActions';

class AddUser extends Component {

  render(){
    return (
      <div className="content">
          <NavigationBarMenu  />

          <div className="container-fluid">
              <div className="row">
                <div className="col-md-2">
                  <LeftSideMenu />
                </div>
                  <div className="col-md-8">
                    <AddUserBoard />
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

AddUser.propTypes = {
  getUserGroups: React.PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    group: state.group
  }
}

export default connect(mapStateToProps, {getUserGroups})(AddUser);
