// import
import React, { Component } from 'react';
import { createGroup, getUserGroups } from '../actions/groupActions';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// CreateGroupBoard Component
class CreateGroupBoard extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      errors: {},
      success: '',
      isLoading: false,
      username: jwt.decode(localStorage.getItem('jwtToken')).username,
    }
    // bind the methods to this context
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  // componentWillMount method
  componentWillMount() {
    // deconstruct isAuthenticated and user from auth props
    const { isAuthenticated, user } = this.props.auth;
    // set createdby to user id from decoded token from the localStorage
    if(isAuthenticated){
      this.setState({
        createdby: jwt.decode(localStorage.getItem('jwtToken')).id,
      });
    }
  }
  // onChange metthod
  onChange(e){
    // reset state when the element changes
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // onSubmit method
  onSubmit(e) {
    // prevent browser default action
    e.preventDefault();
    // disable the button and set error and success to empty
    this.setState({ errors: {}, success: '', isLoading:true });
    // dispatch createGroup action
    this.props.createGroup(this.state)
      .then(
        // if create group is succesful, dispatch an action to get
        // the created Group
        (res) => {
          // deconstruct variable from the store
          const { getUserGroups } = this.props.group;
          const { isAuthenticated, user } = this.props.auth
          // dispatch an action to get the group created
          this.props.getUserGroups({username: user.username});
          // set the success state with success message
          this.setState({
            success: this.state.groupName+' Group created successfully!',
            isLoading: false,
            groupName: ''
          });
        },
        // if error, then set error state with the content of the
        // error
        ({response}) => {
          this.setState({
            errors: response.data,
            isLoading: false,
            groupName: ''
          });
        }
      );
  }

  render(){
    const { errors, success } = this.state;

    return(

      <div className="row">
          <div className="">
            <div className="page-title blue-text text-darken-2">
              CREATE NEW GROUP
            </div>
            {errors.message && <span className="help-block red-text">
              <b>{errors.message}</b></span>}
            {success && <span className="help-block green-text">
              <b>{success}</b>
            </span>}

            <form onSubmit={this.onSubmit} className="" action="" method="">
              <div className="">
                <input type="text" name="groupName"
                       onChange={this.onChange}
                       value={this.state.groupName}
                       className="form-control"
                       placeholder="Enter New Group Name" required/>
              </div>
              <div className="">
                <button disabled={this.state.isLoading}
                  className="btn" type="submit">Add Group</button>
              </div>
            </form>
          </div>
      </div>
    );
  }
}
CreateGroupBoard.propTypes = {
  createGroup: React.PropTypes.func.isRequired,
  getUserGroups: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
}
function mapStateToProps(state){
  return {
    auth: state.userLoginReducer,
    group: state.group
  }
}
export default connect(mapStateToProps, { createGroup, getUserGroups })
                      (CreateGroupBoard);