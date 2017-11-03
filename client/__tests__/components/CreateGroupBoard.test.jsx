/* global expect */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import componentMocks from '../../__mocks__/componentMocks';
import { CreateGroupBoard } from '../../components/CreateGroupBoard';
import '../../__mocks__/localStorage';

describe('<CreateGroupBoard />', () => {
  const group = componentMocks.group;
  const auth = componentMocks.auth;
  const getUserGroups = sinon.spy();
  const onSubmit = sinon.spy();
  const createGroup = sinon.spy(() => Promise
    .resolve({ response: { data: 'Error' } }));

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
    expect(onSubmit.calledOnce).toEqual(false);
  });
});
