// import
import React from 'react';
import GroupLists from './GroupLists.jsx';
import NavigationBarMenu from './NavigationBarMenu.jsx';
import CreateGroupBoard from './CreateGroupBoard.jsx';

/**
 * Create Group Components
 * @function CreateGroup
 * @return {DOM} DOM component 
 */
const CreateGroup = () => (
  <div className="content">
    <NavigationBarMenu />
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <GroupLists />
        </div>
        <div className="col-md-7">
          <CreateGroupBoard />
        </div>
        <div className="col-md-2" />
      </div>
    </div>
  </div>
);

export default CreateGroup;
