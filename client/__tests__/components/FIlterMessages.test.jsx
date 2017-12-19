/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import componentMocks from '../../__mocks__/componentMocks';
import FilterMessages from '../../components/FilterMessages';
import '../../__mocks__/localStorage';

describe('<FilterMessages />', () => {
  const groupMessage = componentMocks.message.messageData[0];
  const groupSelectedId = componentMocks.groupSelectedId;

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
