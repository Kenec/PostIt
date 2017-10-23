// import
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import { NotFound } from '../../components/NotFound.jsx';

describe('<NotFound />', () => {
  const wrapper = mount(<NotFound />);
  it('should have a 404 NOT FOUND text', () => {
    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual('404 NOT FOUND');
    expect(wrapper.find('Link').length).toEqual(1);
    expect(wrapper.find('Link').text()).toEqual('GET BACK HOME');
  });
});
