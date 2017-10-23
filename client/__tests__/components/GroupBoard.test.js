// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import { GroupBoard } from '../../components/GroupBoard.jsx';
import '../../__mocks__/localStorage';

describe('<GroupBoard />', () => {
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
      message: 'Hello World',
      priority_level: 'Normal',
      Users: { username: 'Kene' }
    }],
    readBy: { messageReadUsers: [{ Reader: { username: 'Kene' } }] }
  };
  const auth = { user: { id: '1', username: 'Kene' } };
  const groupSelectedId = '1';
  const clearRetrievedMessageAction = sinon.spy();
  const addNotification = sinon.spy();
  const getNotification = sinon.spy();
  const retrieveMessageAction = sinon.spy();
  const getUsersInGroup = sinon.spy();
  const groupName = 'Random';
  const componentDidMount = sinon.spy(GroupBoard.prototype, 'componentDidMount');
  const componentWillMount = sinon.spy(GroupBoard.prototype, 'componentWillMount');
  const retrieveMessage = sinon.spy(() => Promise.resolve({ data: { users: 'Kene' }, response: { data: 'Error' } }));
  const composeMessage = sinon.spy(() => Promise.resolve({ data:
    {
      id: '1',
      message: 'Hello World',
      groupId: '1',
      sentBy: '1',
      priority_level: 'Normal',
      readBy: '1,2,3',
      createdAt: '',
    }
  }));
  const onChange = sinon.spy();
  const onSubmit = sinon.spy();
  const readBy = sinon.spy();
  const toastMessage = sinon.spy();
  const toggleReadCheckBox = sinon.spy();
  // assign all props to a varibale props
  const props = {
    composeMessage,
    groupSelectedId,
    retrieveMessage,
    clearRetrievedMessageAction,
    addNotification,
    getNotification,
    retrieveMessageAction,
    getUsersInGroup,
    groupName,
    message,
    group,
    auth,
  };
  GroupBoard.contextTypes = { router: PropTypes.object };
  let wrapper = mount(<GroupBoard {...props} />);
  wrapper.setState({ readCheckbox: 'unread' });
  wrapper.setState({ errors: 'Error' });
  wrapper.setState({ message: 'Success' });
  it('should display groups and messages board of a group ', () => {
    expect(wrapper.find('b').at(0).text()).toEqual('Group: Random');
    expect(wrapper.find('[type="radio"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="radio"]').at(1).length).toEqual(1);
    expect(wrapper.find('form').at(0).length).toEqual(1);
    expect(wrapper.find('select').at(0).length).toEqual(1);
    expect(wrapper.find('option').at(0).text()).toEqual('Normal');
    expect(wrapper.find('option').at(1).text()).toEqual('Urgent');
    expect(wrapper.find('option').at(2).text()).toEqual('Critical');
    expect(wrapper.find('textarea').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).length).toEqual(1);
  });
  it('should have filter message component', () => {
    expect(wrapper.find('label').at(0).text()).toEqual('Read');
    expect(wrapper.find('label').at(1).text()).toEqual('Unread');
    expect(wrapper.find('FilterMessages b').at(0).text()).toEqual('Kene');
    expect(wrapper.find('FilterMessages i').at(1).text()).toEqual('Normal');
    expect(wrapper.find('FilterMessages p').at(1).text()).toEqual('Hello World');
  });
  it('should send message when the message form is submitted', () => {
    wrapper.setState({ readCheckbox: 'read' });
    wrapper.find('form').at(0).simulate('submit');
    expect(onSubmit.calledOnce).toEqual(false);
  });
  it('should return Loading... when groups is not resolved', () => {
    props.group.groups = null;
    wrapper = shallow(<GroupBoard {...props} />);
    expect(wrapper.find('h4').text()).toEqual('Loading ...');
  });
});
