// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { Group } from '../../components/Group.jsx';
import Router from '../../__mocks__/router';
import '../../__mocks__/localStorage';


describe('<Group />', () => {
  const group = {
    groups: { groups: [{ id: '1', groupName: 'Random' }] },
    groupsBelonged: [],
    usersInGroup: [{ id: '1', username: 'Kene' }],
  };
  const auth = { user: { id: '1', username: 'Kene' } };
  const params = { groupid: '1' };
  const groupSelectedId = '1';
  const getUserGroups = sinon.spy();
  const getAdminGroups = sinon.spy();
  const getNotification = sinon.spy();
  const retrieveMessageAction = sinon.spy();
  const getUsersInGroup = sinon.spy();
  const groupName = 'Random';
  const componentWillMount = sinon.spy(Group.prototype, 'componentWillMount');
  // assign all props to a varibale props
  const props = {
    params,
    getUserGroups,
    getAdminGroups,
    groupSelectedId,
    groupName,
    group,
    auth,
  };
  Group.contextTypes = { router: PropTypes.object };
  let wrapper = shallow(<Group {...props} />, { context: { router: new Router() } });
  it('should display groups and messages board of a group ', () => {
    expect(wrapper.find('<NavigationBarMenu />').at(0).length).toEqual(1);
    expect(wrapper.find('<GroupMembers />').at(0).length).toEqual(1);
    expect(wrapper.find('<GroupBoard />').at(4).length).toEqual(1);
    expect(wrapper.find('<SearchMember />').at(5).length).toEqual(1);
  });
  it('should display Loading... when group is not resolved ', () => {
    props.group.groups = null;
    wrapper = shallow(<Group {...props} />, { context: { router: new Router() } });
    expect(wrapper.find('h4').at(0).text()).toEqual('Loading ...');
  });
});
