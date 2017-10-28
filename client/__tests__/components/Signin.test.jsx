/* global expect */
// import
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { Signin } from '../../components/Signin';

describe('<Signin />', () => {
  const userSigninRequestAction = sinon.spy();
  const messages = [{
    id: '1',
    text: 'Hello'
  }]; // spy on message props
  const onSubmit = sinon.spy(Signin.prototype, 'onSubmit');
  const onChange = sinon.spy(Signin.prototype, 'onChange');
  const deleteFlashMessage = sinon.spy();
  const getUserGroups = sinon.spy();
  const auth = {};
  // assign all props to a varibale props
  const props = {
    userSigninRequestAction,
    deleteFlashMessage,
    getUserGroups,
    messages,
    auth,
  };
  // assign context to a variables
  Signin.contextTypes = { router: PropTypes.func };
  // assign mounting Signin component to a variable
  const wrapper = mount(<Signin {...props} />);
  it('should have a signin form', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
  });
  it('should call onSubmit method when signin button is clicked', () => {
    wrapper.find('[type="submit"]').get(0).click();
    wrapper.setState({ username: 'Kene' });
    expect(onSubmit.calledOnce).toEqual(true);
  });
  it('should call onChange method when an input state is changed', () => {
    wrapper.find('[type="text"]').at(0).simulate('change');
    expect(onChange.calledOnce).toEqual(true);
  });
});
