// import
/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { SearchMember } from '../components/SearchMember.jsx';

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
        id: '1',
        username: 'Kene',
        email: 'kene@email.com',
        phone: '234'
      },
      {
        id: '2',
        username: 'Obi',
        email: 'obi@email.com',
        phone: '234'
      }
    ] },
    usersInGroup: [{ username: 'Kene' }]
  };
  const groupId = '';
  const auth = {};

  const componentWillMount = sinon.spy(SearchMember.prototype, 'componentWillMount');
  const onChange = sinon.spy(SearchMember.prototype, 'onChange');
  const decreaseOffset = sinon.spy(SearchMember.prototype, 'decreaseOffset');
  const increaseOffset = sinon.spy(SearchMember.prototype, 'increaseOffset');
  const addUser = sinon.spy(SearchMember.prototype, 'addUser');
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
    wrapper.find('Link').at(0).simulate('click');
    expect(decreaseOffset.calledOnce).toEqual(true);
    wrapper.find('Link').at(2).simulate('click');
    expect(increaseOffset.calledOnce).toEqual(true);
  });
});
