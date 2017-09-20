/* global expect */
// import
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { Signin } from '../components/Signin.jsx';

describe('<Signin />', () => {
  // const form = sinon.spy(); // spy on the Signin button
  const userSigninRequestAction = sinon.spy(); // spy on the userSigninRequest props
  const messages = []; // spy on message props
  const deleteFlashMessage = sinon.spy(); // spy on the deleteFlashMessage props
  const getUserGroups = sinon.spy(); // spy on getUserGroup props
  const auth = {};
  const onSubmit = sinon.spy(Signin.prototype, 'onSubmit');
  const onChange = sinon.spy(Signin.prototype, 'onChange');
  // assign all props to a varibale props
  const props = { userSigninRequestAction, auth, deleteFlashMessage, getUserGroups, messages };
  // assign context to a variables
  Signin.contextTypes = { router: PropTypes.func };
  // assign mounting Signin component to a variable
  const wrapper = mount(<Signin {...props} />);
  // test if it contains NavigationBar component
  // it('should contain <NavigationBar /> component', () => {
  //   expect(wrapper).toContain(<NavigationBar/>);
  // });
  // test if all the form field are available in the signin form
  it('should have a signin form', () => {
    expect(wrapper.find('form').length).toEqual(1); // check if their is a form
    expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
  });
  it('should call onSubmit method when signin button is clicked', () => {
    // test if onSubmit is called each time the signin btn is clicked
    wrapper.find('[type="submit"]').get(0).click(); // .simulate('click');
    expect(onSubmit.calledOnce).toEqual(true);
  });
  it('should call onChange method when an input state is changed', () => {
    // test if onChange is called when a change event occurs
    wrapper.find('[type="text"]').at(0).simulate('change'); // .simulate('click');
    expect(onChange.calledOnce).toEqual(true);
  });
  // it('should call isValid function when a form is submitted', () => {
  //   // test if isValid function checks for valid input
  //   wrapper.find('[type="submit"]').at(0).simulate('click'); //.simulate('click');
  //   expect(isValid.calledOnce).toEqual(true);
  // });
});
