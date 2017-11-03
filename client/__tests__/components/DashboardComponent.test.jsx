/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import componentMocks from '../../__mocks__/componentMocks';
import { DashboardComponent } from '../../components/DashboardComponent';
import '../../__mocks__/localStorage';

describe('<DashboardComponent />', () => {
  const group = componentMocks.group;
  const message = componentMocks.message;
  const auth = componentMocks.auth;
  const getNotification = sinon.spy();

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
    expect(wrapper.find('span').at(0).text())
      .toEqual('You have (1) unread messages');
    expect(wrapper.find('Link').at(0).text())
      .toEqual('Kene sent a message on  Random  Hello WorldInvalid date');
  });
});
