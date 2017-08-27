import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';
/**
 * addFlashMessage - description
 *
 * @param  {string} message message to be added
 * @return {object}         id and types
 */
export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}

/**
 * deleteFlashMessage - description
 *
 * @param  {integer} id message id
 * @return {object}  id and type
 */
export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
}
