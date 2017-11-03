/* global expect */
import flashMessages from '../../reducers/flashMessages';
import mockAction from '../../__mocks__/actions';

const state = [];
describe('FlashMessage reducers', () => {
  describe('When ADD_FLASH_MESSAGE action type is fired from an action', () => {
    it('should add message to the store', () => {
      const action = mockAction.addFlashMessage;
      expect(flashMessages(state, action)).toEqual([
        { id: 1,
          type: 'success',
          text: 'This is a success message!'
        }
      ]);
    });
  });
  describe('When DELETE_FLASH_MESSAGE action type is fired from action', () => {
    it('should remove message from the store', () => {
      const action = mockAction.deleteFlashMessage;
      expect(flashMessages(state, action)).toEqual([]);
    });
  });
  describe('When No action is fired', () => {
    it('flash message reducer should return the initial state', () => {
      const action = {};
      expect(flashMessages(state, action)).toEqual(state);
    });
  });
});
