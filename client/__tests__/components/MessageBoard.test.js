// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { MessageBoard } from '../../components/MessageBoard.jsx';
import '../../__mocks__/localStorage';
import Router from '../../__mocks__/router';

describe('<MessageBoard />', () => {
  const group = {
    // groups: { groups: [{ id: 1, groupName: 'Random' }] },
    groupsBelonged: []
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
  const params = { groupid: 1 };
  const getUserGroups = sinon.spy();
  const getAdminGroups = sinon.spy();
  const componentWillMount = sinon.spy(MessageBoard.prototype, 'componentWillMount');
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
    expect(wrapper.find('div').at(3).text()).toEqual('<Connect(GroupMembers) />');
    expect(wrapper.find('div').at(4).text()).toEqual('<Connect(MessageDetailBoard) />');
    expect(wrapper.find('div').at(5).text()).toEqual('<Connect(SearchMember) />');
  });
  it('should redirect to NOT FOUND PAGE when groupId is invalid', () => {
    // props.group.groups = { groups: [{ id: 3, groupName: 'Random' }] };
    wrapper = shallow(<MessageBoard {...props} />, { context: { router: new Router() } });
    // expect(wrapper.context().router.length()).toEqual(1);
    // console.log(wrapper.debug());
  });
});
