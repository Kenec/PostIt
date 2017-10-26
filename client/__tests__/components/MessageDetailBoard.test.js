// import
/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { MessageDetailBoard } from '../../components/MessageDetailBoard.jsx';
import '../../__mocks__/localStorage';

describe('<MessageDetailBoard />', () => {
  const group = {
    groups: { groups: ['Redux', 'Test'] },
    groupsBelonged: []
  };

  const message = {
    messageData: [{
      id: 1,
      ReadBy: '1,2,3',
      createdAt: '2-10-2019',
      message: 'Hello Worlld',
      priorityLevel: 'Normal',
      Users: { username: 'Kene' }
    }],
    readBy: { messageReadUsers: [{ Reader: { username: 'Kene' } }] }
  };
  let groupName = 'Random';
  const auth = {};
  const messageId = 1;
  const groupSelectedId = '';
  const retrieveMessage = sinon.spy(() =>
    Promise.resolve({ message: { data: 'Hello World' } }));
  const clearRetrievedMessageAction = sinon.spy();
  const updateNotification = sinon.spy();
  const updateReadBy = sinon.spy();
  const retrieveMessageAction = sinon.spy();
  const getReadBy = sinon.spy();

  const componentWillMount = sinon.spy(MessageDetailBoard.prototype, 'componentWillMount');
  const componentDidMount = sinon.spy(MessageDetailBoard.prototype, 'componentDidMount');
  const onChange = sinon.spy(MessageDetailBoard.prototype, 'onChange');
  const readBy = sinon.spy(MessageDetailBoard.prototype, 'readBy');
  // assign all props to a varibale props
  const props = {
    group,
    groupName,
    auth,
    retrieveMessage,
    clearRetrievedMessageAction,
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
    expect(wrapper.find('p').at(1).text()).toEqual('Hello Worlld');
    expect(wrapper.find('b').at(2).text()).toEqual('Message Readers');
    expect(wrapper.find('i').at(2).text()).toEqual('  hover here');
    expect(wrapper.find('span').at(4).text()).toEqual('@Kene ');
  });
});
