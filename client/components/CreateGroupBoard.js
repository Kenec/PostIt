import React, { Component } from 'react';
import { createGroup } from '../actions/groupActions';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

class CreateGroupBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      errors: {},
      success: '',
      isLoading: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      this.setState({
        createdby: jwt.decode(localStorage.getItem('jwtToken')).id,
      });
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, success: '', isLoading:true });
    this.props.createGroup(this.state)
      .then(
        () => {
          this.setState({
            success: this.state.groupName+' Group created successfully!',
            isLoading: false
          });
        },
        ({response}) => {
          this.setState({
            errors: response.data,
            isLoading: false
          });
        }
      );
  }

  render(){
    const { errors, success } = this.state;

    return(

      <div className="row">
          <div className="">
            <div className="page-title blue-text text-darken-2">CREATE NEW GROUP</div>
            {errors.message && <span className="help-block red-text"><b>{errors.message}</b></span>}
            {success && <span className="help-block green-text"><b>{success}</b></span>}

            <form onSubmit={this.onSubmit} className="" action="" method="">
              <div className="">
                <input type="text" name="groupName" onChange={this.onChange} value={this.state.groupName} className="form-control" placeholder="Enter New Group Name" required/>
              </div>
              <div className="">
                <button disabled={this.state.isLoading} className="btn" type="submit">Add Group</button>
              </div>
            </form>
          </div>
      </div>
    );
  }
}
CreateGroupBoard.propTypes = {
  createGroup: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
}
function mapStateToProps(state){
  return {
    auth: state.userLoginReducer,
    group: state.group
  }
}
export default connect(mapStateToProps, { createGroup })(CreateGroupBoard);
