import React from 'react';
import { shallow, mount, render } from 'enzyme';
import configureStore from 'redux-mock-store'
import ConnectedSignup, { Signup } from '../components/Signup';


describe("HOME", () => {
  const initialState = {

  };
  const mockStore = configureStore();
  let store,container;

  beforeEach(() =>{
    store = mockStore(initialState);
    container = shallow(<ConnectedSignup store={store} />);
  });

  it('+++ render the connected(SMART) component', () => {
      expect(container.length).toEqual(1);
   });

  //  it('+++ check Prop matches with initialState', () => {
  //     expect(container.prop('userSignupRequest')).toEqual(initialState.userSignupRequest)
  //  });
});
