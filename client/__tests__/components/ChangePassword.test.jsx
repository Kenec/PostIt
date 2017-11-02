// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import componentMocks from '../../__mocks__/componentMocks';
import { ChangePassword } from '../../components/ChangePassword';
import '../../__mocks__/localStorage';

describe('<ForgotPassword />', () => {
  const params = componentMocks.params;
  const onSubmit = sinon.spy();
  const isValidToken = sinon.spy(() => Promise.resolve());
  const updatePassword = sinon.spy(() => Promise
    .resolve({ data: { message: 'Success' }, response: { data: 'Error' } }));
  const forgotPasswordRequest = sinon.spy(() => Promise
    .resolve({ data: { message: 'Success' }, response: { data: 'Error' } }));
  // assign all props to a varibale props
  const props = {
    params,
    isValidToken,
    updatePassword,
    forgotPasswordRequest,
  };

  ChangePassword.contextTypes = { router: PropTypes.object };
  let wrapper = mount(<ChangePassword {...props} />);
  it('should have a chnage password form', () => {
    expect(wrapper.find('b').at(1).text()).toEqual('Change Password');
    expect(wrapper.find('form').at(0).length).toEqual(1);
    expect(wrapper.find('label').at(0).text()).toEqual('Password:');
    expect(wrapper.find('label').at(1).text()).toEqual('Retype password:');
    expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="password"]').at(1).length).toEqual(1);
    expect(wrapper.find('button').at(0).text()).toEqual('Change Password');
  });
  it('should call onSubmit when change password form is submitted', () => {
    wrapper.setState({ email: 'Kene@email.com',
      errors: '',
      success: 'success',
      isValid: true });
    wrapper = mount(<ChangePassword {...props} />);
    wrapper.find('form').at(0).simulate('submit');
    expect(onSubmit.calledOnce).toEqual(false);
  });
});
