// import
/* global expect */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Footer } from '../../components/Footer.jsx';
import '../../__mocks__/localStorage';

describe('<Footer />', () => {
  const wrapper = mount(<Footer />);
  it('should display copyright and Designed by', () => {
    expect(wrapper.find('span').at(1).text()).toEqual('Copyright © 2017');
    expect(wrapper.find('b').at(0).text()).toEqual('Designed by Kene');
  });
});
