/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import componentMocks from '../../__mocks__/componentMocks';
import { MessageDetailBoard } from '../../components/MessageDetailBoard';
import '../../__mocks__/localStorage';

describe('<MessageDetailBoard />', () => {
  const group = componentMocks.group;

  const message = componentMocks.message;
  const groupName = componentMocks.groupName;
  const auth = {};
  const messageId = componentMocks.messages[0].id;
  const groupSelectedId = componentMocks.groupSelectedId;
  const retrieveMessage = sinon.spy(() =>
    Promise.resolve({ message: { data: 'Hello World' } }));
  const clearRetrievedMessage = sinon.spy();
  const updateNotification = sinon.spy();
  const updateReadBy = sinon.spy();
  const retrieveMessageAction = sinon.spy();
  const getReadBy = sinon.spy();

  const props = {
    group,
    groupName,
    auth,
    retrieveMessage,
    clearRetrievedMessage,
    groupSelectedId,
    updateNotification,
    updateReadBy,
    retrieveMessageAction,
    getReadBy,
    message,
    messageId
  };

  MessageDetailBoard.contextTypes = { router: PropTypes.func };
  const wrapper = mount(<MessageDetailBoard {...props} />);
  wrapper.setState({ sentBy: '1' });
  wrapper.setState({ priorityLevel: 'Normal' });

  it('should have the message details and readers', () => {
    expect(wrapper.find('Link').at(0).text()).toEqual(' Random');
    expect(wrapper.find('span').at(1).text()).toEqual('Kene');
    expect(wrapper.find('i').at(1).text()).toEqual('Normal');
    expect(wrapper.find('p').at(1).text()).toEqual('Hello World');
    expect(wrapper.find('b').at(2).text()).toEqual('Message Readers');
    expect(wrapper.find('i').at(2).text()).toEqual('  hover here');
    expect(wrapper.find('span').at(4).text()).toEqual('@Kene ');
  });
});
