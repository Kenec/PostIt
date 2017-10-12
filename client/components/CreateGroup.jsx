// import
import React from 'react';
import NavigationBarMenu from './NavigationBarMenu';
import GroupLists from './GroupLists';
import CreateGroupBoard from './CreateGroupBoard';

/**
 * @return {DOM} -DOM component
 */
function CreateGroup() {
  return (
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
}

export default CreateGroup;
