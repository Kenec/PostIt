import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/signinActions';
import { getUserGroups, getGroupsCreatedByUser } from '../actions/groupActions';
import { retrieveMessage } from '../actions/messageActions';

class NavigationBarMenu extends Component {
  componentWillMount() {
    const { getUserGroups, getGroupsCreatedByUser } = this.props.group;
    const { isAuthenticated, user } = this.props.auth

    this.props.getUserGroups({username: user.username});
    this.props.getGroupsCreatedByUser({userId: user.id});

  }
  logout(e){
    e.preventDefault;
    this.props.logout();
  }
  render(){
    const { isAuthenticated, user } = this.props.auth;
    return(
      <div className="well container-fluid ">
          <div className="row">
              <div className="col-md-8 my_title">
                <img src="/images/postit.png" width="50px" height="50px"/>
                <strong className="text-info"><b>POSTIT</b></strong>
              </div>
              <div className="col-md-4 right-align">
                <a href="#"><span className="glyphicon glyphicon-user">&nbsp;</span>Welcome {isAuthenticated &&  user.username  }!</a>
                <a href="" onClick={this.logout.bind(this)}>&nbsp;&nbsp;&nbsp;Logout</a>
              </div>
              <div className="row">
                <div className="col-md-6">

                </div>
                <div className="col-md-6 right-align">
                  <div className="btn-group">
                    <button type="button" className=""><Link to="message"><span className="glyphicon glyphicon-envelope"></span><b> Message </b></Link></button>
                    <button type="button" className=""><Link to="archiveMessage"><span className="glyphicon glyphicon-trash"></span><b> Archive </b></Link></button>
                    <button type="button" className=""><Link to="createGroup"><span className="glyphicon glyphicon-lock"></span><b> Create Group </b></Link></button>
                    <button type="button" className=""><Link to="addUser"><span className="glyphicon glyphicon-plus"></span><b> Add Member </b></Link></button>
                  </div>
                </div>
              </div>
          </div>
        </div>
    );
  }
}

NavigationBarMenu.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
  getUserGroups: React.PropTypes.func.isRequired,
  getGroupsCreatedByUser: React.PropTypes.func.isRequired,

}

function mapStateToProps(state) {
  return {
    auth: state.userLoginReducer,
    group: state.group
  };
}

export default connect(mapStateToProps, {logout, getUserGroups, getGroupsCreatedByUser })(NavigationBarMenu);
