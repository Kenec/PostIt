/* global expect */
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../components/DashboardPage';
import Router from '../../__mocks__/router';
import '../../__mocks__/localStorage';


describe('<DashboardPage />', () => {
  const isAuthenticated = true;
  const props = {
    isAuthenticated
  };

  DashboardPage.contextTypes = { router: PropTypes.object };
  const wrapper = shallow(<DashboardPage {...props} />,
    { context: { router: new Router() } });

  it('should display GroupList and DashboardPage Component', () => {
    expect(wrapper.find('<NavigationBarMenu />').at(0).length).toEqual(1);
    expect(wrapper.find('<GroupLists />').at(0).length).toEqual(1);
    expect(wrapper.find('<Dashboard />').at(0).length).toEqual(1);
  });
});
