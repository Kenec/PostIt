// import
/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SearchMember } from '../../components/SearchMember';
import '../../__mocks__/localStorage';

describe('<SearchMember />', () => {
  const getUserGroups = sinon.spy();
  const searchAllUsers = sinon.spy();
  const getUserInfo = sinon.spy();
  const addUserToGroups = sinon.spy();
  const getUsersInGroupAction = sinon.spy();
  const group = {
    groups: [],
    groupsBelonged: [],
    searchedUsers: { rows: [
      {
        id: 1,
        username: 'Kene',
        email: 'kene@email.com',
        phone: '234'
      },
      {
        id: 2,
        username: 'Obi',
        email: 'obi@email.com',
        phone: '234'
      }
    ] },
    usersInGroup: [{ username: 'Kene' }]
  };
  const groupId = '';
  const auth = {};

  const onChange = sinon.spy(SearchMember.prototype, 'onChange');
  const handlePagination = sinon.spy(SearchMember.prototype,
    'handlePagination');
  // assign all props to a varibale props
  const props = {
    groupId,
    group,
    auth,
    getUserGroups,
    searchAllUsers,
    getUserInfo,
    addUserToGroups,
    getUsersInGroupAction };

  const wrapper = mount(<SearchMember {...props} />);

  wrapper.setState({ user: 'Kene' });
  wrapper.setState({ groupId: 1 });
  it('should have a search user form', () => {
    expect(wrapper.find('SearchMember').length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
  });
  it('should display users onChange of the input field', () => {
    wrapper.find('input').simulate('change');
    expect(onChange.calledOnce).toEqual(true);
    wrapper.setState({ username: 'Kene' });
    expect(wrapper.find('[type="hidden"]').length).toEqual(8);
    expect(wrapper.find('span').at(0).text()).toEqual('Kene');
    expect(wrapper.find('span').at(2).text()).toEqual('Obi');
  });
  it('should have pagination', () => {
    wrapper.find('[type="text"]').simulate('change');
    wrapper.find('.next a').simulate('click');
    // expect(handlePagination.calledOnce).toEqual(true);
  });
});