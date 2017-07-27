import React, { Component } from 'react';


class CreateGroupBoard extends Component {

  render(){
    return(
      <div className="row">
          <div className="">
            <div className="page-title blue-text text-darken-2">CREATE NEW GROUP</div>
            <form>
              <div className="">
                <input type="text" className="form-control" placeholder="Enter New Group Name"/>
              </div>
              <div className="">
                <button className="btn" type="submit">Add Group</button>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default CreateGroupBoard;
