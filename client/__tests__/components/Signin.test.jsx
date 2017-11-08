/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import componentMocks from '../../__mocks__/componentMocks';

import { Signin } from '../../components/Signin';

describe('<Signin />', () => {
  const signin = sinon.spy();
  const messages = componentMocks.messages;
  const onSubmit = sinon.spy(Signin.prototype, 'onSubmit');
  const onChange = sinon.spy(Signin.prototype, 'onChange');
  const deleteFlashMessage = sinon.spy();
  const getUserGroups = sinon.spy();
  const auth = {};

  const props = {
    signin,
    deleteFlashMessage,
    getUserGroups,
    messages,
    auth,
  };

  Signin.contextTypes = { router: PropTypes.func };

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
