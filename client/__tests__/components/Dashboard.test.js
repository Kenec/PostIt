// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { Dashboard } from '../../components/Dashboard.jsx';
import Router from '../../__mocks__/router';
import '../../__mocks__/localStorage';


describe('<Dashboard />', () => {
  const isAuthenticated = true;
  const componentWillMount = sinon.spy(Dashboard.prototype, 'componentWillMount');
  // assign all props to a varibale props
  const props = {
    isAuthenticated
  };
  Dashboard.contextTypes = { router: PropTypes.object };
  let wrapper = shallow(<Dashboard {...props} />, { context: { router: new Router() } });
  it('should display GroupList and Dashboard Component', () => {
    expect(wrapper.find('<NavigationBarMenu />').at(0).length).toEqual(1);
    expect(wrapper.find('<GroupLists />').at(0).length).toEqual(1);
    expect(wrapper.find('<DashboardComponent />').at(0).length).toEqual(1);
  });
});
