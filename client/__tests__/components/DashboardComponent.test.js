// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { DashboardComponent } from '../../components/DashboardComponent.jsx';
import '../../__mocks__/localStorage';

describe('<DashboardComponent />', () => {
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
      priorityLevel: 'Normal',
      Users: { username: 'Kene' }
    }],
    readBy: { messageReadUsers: [{ Reader: { username: 'Kene' } }] }
  };
  const auth = { user: { id: 1, username: 'Kene' } };
  const componentWillMount = sinon.spy(DashboardComponent.prototype, 'componentWillMount');
  const getNotification = sinon.spy();
  // assign all props to a varibale props
  const props = {
    group,
    auth,
    message,
    getNotification
  };
  DashboardComponent.contextTypes = { router: PropTypes.object };
  let wrapper = mount(<DashboardComponent {...props} />);
  it('should display Loading... when notificatonData is not resolved', () => {
    expect(wrapper.find('h4').at(0).text()).toEqual('Loading ...');
  });
  it('should display dashboard and notifications', () => {
    props.message.notificationData = {
      messageRes: [{
        messageId: '1',
        Group: { id: '1', groupName: 'Random', createdAt: '' },
        User: { username: 'Kene' },
        Messages: { message: 'Hello World' } }],
    };
    wrapper = mount(<DashboardComponent {...props} />);
    expect(wrapper.find('b').at(0).text()).toEqual('NOTIFICATIONS');
    expect(wrapper.find('span').at(0).text()).toEqual('You have (1) unread messages');
    expect(wrapper.find('Link').at(0).text()).toEqual('Kene sent a message on  Random  Hello WorldInvalid date');
  });
});
