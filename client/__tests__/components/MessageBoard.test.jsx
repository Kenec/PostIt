// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import componetMocks from '../../__mocks__/componentMocks';
import { MessageBoard } from '../../components/MessageBoard';
import '../../__mocks__/localStorage';
import Router from '../../__mocks__/router';

describe('<MessageBoard />', () => {
  const group = { groupsBelonged: [] };
  const message = componetMocks.message;
  const auth = componetMocks.auth;
  const params = componetMocks.params;
  const getUserGroups = sinon.spy();
  const getAdminGroups = sinon.spy();
  // assign all props to a varibale props
  const props = {
    getAdminGroups,
    getUserGroups,
    params,
    group,
    auth,
    message,
  };

  MessageBoard.contextTypes = { router: PropTypes.object };
  let wrapper = shallow(<MessageBoard {...props} />);
  it('should display loading when no group is not selected', () => {
    expect(wrapper.find('h4').length).toEqual(1);
    expect(wrapper.find('h4').text()).toEqual('Loading ...');
  });
  it('should render the component when group is selected', () => {
    props.group.groups = { groups: [{ id: 1, groupName: 'Random' }] };
    wrapper = shallow(<MessageBoard {...props} />);
    expect(wrapper.find('div').at(3).text())
      .toEqual('<Connect(GroupMembers) />');
    expect(wrapper.find('div').at(4).text())
      .toEqual('<Connect(MessageDetailBoard) />');
    expect(wrapper.find('div').at(5).text())
      .toEqual('<Connect(SearchMember) />');
  });
  it('should redirect to NOT FOUND PAGE when groupId is invalid', () => {
    wrapper = shallow(<MessageBoard {...props} />,
      { context: { router: new Router() } });
  });
});
