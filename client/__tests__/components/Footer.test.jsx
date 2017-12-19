/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import { Footer } from '../../components/Footer';

describe('<Footer />', () => {
  const wrapper = mount(<Footer />);

  it('should display copyright and Designed by', () => {
    expect(wrapper.find('span').at(1).text()).toEqual('Copyright © 2017');
    expect(wrapper.find('b').at(0).text()).toEqual('Designed by Kene');
  });
});
