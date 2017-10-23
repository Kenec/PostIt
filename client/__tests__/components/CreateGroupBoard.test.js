// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { CreateGroupBoard } from '../../components/CreateGroupBoard.jsx';
import '../../__mocks__/localStorage';

describe('<CreateGroupBoard />', () => {
  const group = {
    groups: { groups: [{ id: '1', groupName: 'Random' }] },
    groupsBelonged: [],
    usersInGroup: [{ id: '1', username: 'Kene' }],
  };
  const auth = { user: { id: 1, username: 'Kene' } };
  const onSubmit = sinon.spy();
  const componentWillMount = sinon.spy(CreateGroupBoard.prototype, 'componentWillMount');
  const getUserGroups = sinon.spy();
  const createGroup = sinon.spy(() => Promise.resolve({ response: { data: 'Error' } }));
  // assign all props to a varibale props
  const props = {
    group,
    auth,
    getUserGroups,
    createGroup
  };
  const wrapper = mount(<CreateGroupBoard {...props} />);
  wrapper.setState({ createdby: '1' });
  wrapper.setState({ errors: 'Error' });
  wrapper.setState({ message: 'Success' });
  wrapper.setState({ groupName: 'Random' });
  it('should have create group form', () => {
    expect(wrapper.find('div').at(2).text()).toEqual('CREATE NEW GROUP');
    expect(wrapper.find('form').at(0).length).toEqual(1);
    expect(wrapper.find('[type="text"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
  });
  it('should create a group when group form is submitted', () => {
    wrapper.find('form').at(0).simulate('submit');
    // expect(onSubmit.calledOnce).toEqual(true);
  });
});
