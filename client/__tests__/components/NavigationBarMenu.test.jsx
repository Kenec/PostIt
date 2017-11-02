// import
/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import componentMocks from '../../__mocks__/componentMocks';
import { NavigationBarMenu } from '../../components/NavigationBarMenu';

describe('<NavigationBarMenu />', () => {
  const auth = componentMocks.auth;
  const getUserGroups = sinon.spy();
  const getAdminGroups = sinon.spy();
  const logout = sinon.spy();
  const onLogout = sinon.spy(NavigationBarMenu.prototype, 'onLogout');
  // assign all props to a variable props
  const props = {
    auth,
    logout,
    getUserGroups,
    getAdminGroups
  };
  NavigationBarMenu.contextTypes = { router: PropTypes.func };
  const wrapper = mount(<NavigationBarMenu {...props} />);
  it('should have Link DASHBOARD and CREATE GROUP', () => {
    expect(wrapper.find('Link').at(0).text()).toEqual('DASHBOARD ');
    expect(wrapper.find('Link').at(1).text()).toEqual(' CREATE GROUP');
    expect(wrapper.find('Link').at(2).text()).toEqual('Logout');
  });
  it('should have logout method fired when logout is clicked', () => {
    wrapper.find('Link').at(2).simulate('click');
    expect(onLogout.calledOnce).toEqual(true);
  });
});
