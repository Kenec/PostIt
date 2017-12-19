/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import componentMocks from '../../__mocks__/componentMocks';
import { GroupMembers } from '../../components/GroupMembers';
import '../../__mocks__/localStorage';

describe('<GroupMembers />', () => {
  const group = componentMocks.group;
  const message = componentMocks.message;
  const auth = componentMocks.auth;
  const params = componentMocks.params;
  const groupSelectedId = componentMocks.groupSelectedId;
  const getUsersInGroup = sinon.spy(() => Promise
    .resolve({ data: { users: 'Kene' }, response: { data: 'Error' } }));
  const getUsersInGroupAction = sinon.spy();
  const removeGroupUser = sinon.spy(() => Promise
    .resolve({ data: { message: 'User found' } }));
  const confirmAndRemoveUser = sinon.spy();

  const props = {
    groupSelectedId,
    getUsersInGroup,
    getUsersInGroupAction,
    removeGroupUser,
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

  it(`should ask a user to confirm a removal of
  another user when remove button is clicked`, () => {
      wrapper.find('[type="button"]').at(0).simulate('click');
      expect(confirmAndRemoveUser.calledOnce).toEqual(false);
    });

  it('should return Loading... when group is not resolved', () => {
    props.group.groups = null;
    wrapper = mount(<GroupMembers {...props} />);
    expect(wrapper.find('h4').text()).toEqual('Loading ...');
  });
});
