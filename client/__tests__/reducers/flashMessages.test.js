/* global expect */
import flashMessages from '../../reducers/flashMessages';
import mockAction from '../../__mocks__/actions';

const state = [];
describe('FlashMessage reducers: ', () => {
  describe('addFlashMessage', () => {
    it('should add flash message to the store', () => {
      const action = mockAction.addFlashMessage;
      expect(flashMessages(state, action)).toEqual([
        { id: 1,
          type: 'success',
          text: 'This is a success message!'
        }
      ]);
    });
  });

  describe('deletFlashMessage', () => {
    it('should remove flash message from the store', () => {
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
