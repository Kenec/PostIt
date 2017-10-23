// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import FilterMessages from '../../components/FilterMessages.jsx';
import '../../__mocks__/localStorage';

describe('<FilterMessages />', () => {
  const groupMessage = {
    id: '1',
    Users: { username: 'Kene' },
    priorityLevel: 'Normal',
    createdAt: '',
    message: 'Hello World'
  };
  const groupSelectedId = '';

  // assign all props to a varibale props
  const props = {
    groupMessage,
    groupSelectedId,
  };
  const wrapper = mount(<FilterMessages {...props} />);
  it('should message filter component', () => {
    expect(wrapper.find('b').at(0).text()).toEqual('Kene');
    expect(wrapper.find('i').at(1).text()).toEqual('Normal');
    expect(wrapper.find('p').at(1).text()).toEqual('Hello World');
  });
});
