/* global expect */
import samples from '../../__mocks__/samples';
import * as flashmessage from '../../actions/flashMessages';
import * as types from '../../actions/types';

describe('Flashmessage Action', () => {
  it('should have addFlasmessage action creator', () => {
    const myMessage = samples.myMessage;
    expect(flashmessage.addFlashMessage(myMessage)).toEqual({
      type: types.ADD_FLASH_MESSAGE,
      message: myMessage
    });
  });
  it('should have deleteFlasmessage action creator', () => {
    const id = samples.id;
    expect(flashmessage.deleteFlashMessage(id)).toEqual({
      type: types.DELETE_FLASH_MESSAGE,
      id
    });
  });
});
