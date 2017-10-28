// import
/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import CreateGroup from '../../components/CreateGroup';
import '../../__mocks__/localStorage';


describe('<CreateGroup />', () => {
  const wrapper = shallow(<CreateGroup />);
  it('should display GroupList and CreatedGroupBoard Component', () => {
    expect(wrapper.find('<NavigationBarMenu />').at(0).length).toEqual(1);
    expect(wrapper.find('<GroupLists />').at(0).length).toEqual(1);
    expect(wrapper.find('<CreateGroupBoard />').at(0).length).toEqual(1);
  });
});
