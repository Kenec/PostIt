// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { ForgotPassword } from '../../components/ForgotPassword';
import '../../__mocks__/localStorage';

describe('<ForgotPassword />', () => {
  const onSubmit = sinon.spy();
  const forgotPasswordRequest = sinon.spy(() => Promise
    .resolve({ data: { message: 'Success' }, response: { data: 'Error' } }));
  // assign all props to a varibale props
  const props = {
    forgotPasswordRequest,
  };

  ForgotPassword.contextTypes = { router: PropTypes.object };
  let wrapper = mount(<ForgotPassword {...props} />);
  it('should have a reset password form', () => {
    expect(wrapper.find('b').at(1).text()).toEqual('Recover Password');
    expect(wrapper.find('form').at(0).length).toEqual(1);
    expect(wrapper.find('label').at(0).text()).toEqual('Email address:');
    expect(wrapper.find('[type="email"]').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).text()).toEqual('Recover Password');
  });
  it('should call onSubmit when reset password form is submitted', () => {
    wrapper.setState({ email: 'Kene@email.com', error: '', isValid: true });
    wrapper = mount(<ForgotPassword {...props} />);
    wrapper.find('form').at(0).simulate('submit');
    expect(onSubmit.calledOnce).toEqual(false);
  });
});
