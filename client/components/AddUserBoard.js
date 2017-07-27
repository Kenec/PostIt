import React, { Component } from 'react';


class AddUserBoard extends Component {

  render(){
    return(
      <div className="row">
        <div className="page-title blue-text text-darken-2">ADD USER TO GROUP</div>
        <form className="" action="" method="">
            <div className="form-group">
                <label htmlFor="groups">Select Group:</label>
                <select className="form-control browser-default" name="groups">
                    <option value="">Andela Fellows</option>
                    <option value="">Football Teams</option>
                    <option value="">Classmates</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control browser-default" name="username"/>
            </div>
            <button type="submit" className="btn btn-primary">Add User</button>
        </form>
      </div>
    );
  }
}

export default AddUserBoard;
