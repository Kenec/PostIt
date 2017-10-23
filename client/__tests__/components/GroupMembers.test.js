// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { GroupMembers } from '../../components/GroupMembers.jsx';
import '../../__mocks__/localStorage';

describe('<GroupMembers />', () => {
  const group = {
    groups: { groups: [{ id: '1', groupName: 'Random' }] },
    groupsBelonged: [],
    usersInGroup: [{ id: '1', username: 'Kene' }],
  };
  const message = {
    messageData: [{
      id: '1',
      ReadBy: '1,2,3',
      createdAt: '2-10-2019',
      message: 'Hello Worlld',
      priority_level: 'Normal',
      Users: { username: 'Kene' }
    }],
    readBy: { messageReadUsers: [{ Reader: { username: 'Kene' } }] }
  };
  const auth = { user: { id: 1, username: 'Kene' } };
  const params = { groupid: 1 };
  const groupSelectedId = '';
  const getUsersInGroup = sinon.spy(() => Promise.resolve({ data: { users: 'Kene' }, response: { data: 'Error' } }));
  const getUsersInGroupAction = sinon.spy();
  const componentWillMount = sinon.spy(GroupMembers.prototype, 'componentWillMount');
  const removeUserFromGroup = sinon.spy(() => Promise.resolve({ data: { message: 'User found' } }));
  const getUser = sinon.spy();
  const removeUser = sinon.spy();
  const confirmAndRemoveUser = sinon.spy();
  // assign all props to a varibale props
  const props = {
    groupSelectedId,
    getUsersInGroup,
    getUsersInGroupAction,
    removeUserFromGroup,
    params,
    group,
    auth,
    message,
  };
  global.confirm = () => true;
  global.alert = sinon.spy();
  GroupMembers.contextTypes = { router: PropTypes.object };
  let wrapper = mount(<GroupMembers {...props} />);
  wrapper.setState({ groupMember: 'Kene' });
  wrapper.setState({ errors: 'Error' });
  wrapper.setState({ message: 'Success' });
  it('should display all users of a group', () => {
    expect(wrapper.find('span').at(0).text()).toEqual('Group Members');
    expect(wrapper.find('span').at(1).text()).toEqual('Kene');
    expect(wrapper.find('[type="button"]').at(0).length).toEqual(1);
  });
  it('should ask a user to confirm a removal of another user when remove button is clicked', () => {
    wrapper.find('[type="button"]').at(0).simulate('click');
    expect(confirmAndRemoveUser.calledOnce).toEqual(false);
  });
  it('should return Loading... when group is not resolved', () => {
    props.group.groups = null;
    wrapper = mount(<GroupMembers {...props} />);
    expect(wrapper.find('h4').text()).toEqual('Loading ...');
  });
});
