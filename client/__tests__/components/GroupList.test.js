// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { GroupLists } from '../../components/GroupLists.jsx';
import '../../__mocks__/localStorage';

describe('<GroupLists />', () => {
  const group = {
    groups: { groups: [{ id: '1', groupName: 'Random' }] },
    groupsBelonged: [{ id: '1', groupName: 'Random' }],
    usersInGroup: [{ id: '1', username: 'Kene' }],
  };
  const auth = { user: { id: 1, username: 'Kene' } };
  // assign all props to a varibale props
  const props = {
    group,
    auth,
  };
  const getUserGroups = sinon.spy();
  const getAdminGroups = sinon.spy();
  const retrieveMessage = sinon.spy();

  let wrapper = mount(<GroupLists {...props} />);

  it('should display list of groups for a user', () => {
    expect(wrapper.find('span').at(0).text()).toEqual('Groups');
    expect(wrapper.find('Link').at(0).text()).toEqual('Add New');
    expect(wrapper.find('span').at(2).text()).toEqual('Random');
  });
  it('should display Loading... when group is not resolved', () => {
    props.group = {};
    wrapper = mount(<GroupLists {...props} />);
    expect(wrapper.find('h4').text()).toEqual('Loading ...');
  });
});
