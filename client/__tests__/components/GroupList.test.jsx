/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import componentMocks from '../../__mocks__/componentMocks';
import { GroupLists } from '../../components/GroupLists';
import '../../__mocks__/localStorage';

describe('<GroupLists />', () => {
  const group = componentMocks.group;
  const auth = componentMocks.auth;

  const props = {
    group,
    auth,
  };

  let wrapper = mount(<GroupLists {...props} />);

  it('should display list of groups for a user', () => {
    expect(wrapper.find('span').at(0).text()).toEqual('Groups');
    expect(wrapper.find('Link').at(0).text()).toEqual('Add New');
    expect(wrapper.find('span').at(2).text()).toEqual('Random');
  });

  it('should display Loading... when group is not resolved', () => {
    props.group = {};
    wrapper = mount(<GroupLists {...props} />);
    expect(wrapper.find('h4').text()).toEqual('Loading ...');
  });
});
