/* global expect */
// import
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { Signup } from '../../components/Signup';

describe('<Signup />', () => {
  const userSignupRequest = sinon.spy(); // spy on the userSignupRequest props
  const addFlashMessage = sinon.spy(); // spy on addFlashMessage props
  const getUserGroups = sinon.spy();
  const onSubmit = sinon.spy(Signup.prototype, 'onSubmit');
  const onChange = sinon.spy(Signup.prototype, 'onChange');
  const isValid = sinon.spy(Signup.prototype, 'isValid');
  // assign all props to a varibale props
  const props = { userSignupRequest, addFlashMessage, getUserGroups };
  // assign context to a variables
  Signup.contextTypes = { router: PropTypes.func };
  // assign mounting Signup component to a variable
  const wrapper = mount(<Signup {...props} />);
  it('should have a signup form', () => {
    // test if all the form field are available in the signup form
    expect(wrapper.find('form').length).toEqual(1); // check if their is a form
    expect(wrapper.find('[type="text"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="email"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="text"]').at(1).length).toEqual(1);
    expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
  });
  it('should call onSubmit method when signup button is clicked', () => {
    // test if onSubmit is called each time the signup btn is cliecked
    wrapper.find('[type="submit"]').get(0).click();
    expect(onSubmit.calledOnce).toEqual(true);
  });
  it('should call onChange method when an input state is changed', () => {
    // test if onChange is called when a change event occurs
    wrapper.find('[type="text"]').at(0).simulate('change');
    expect(onChange.calledOnce).toEqual(true);
  });
  it('should call isValid function when a form is submitted', () => {
    // test if isValid function checks for valid input
    wrapper.find('[type="submit"]').at(0).simulate('click');
    expect(isValid.calledOnce).toEqual(true);
  });
});
