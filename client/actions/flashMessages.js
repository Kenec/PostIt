// import
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

/**
 * @function addFlashMessage
 * @param  {string} message - message to be added
 * @return {object} - message and types
 */
export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
/**
 * @function deleteFlashMessage
 * @param  {number} id  - message id
 * @return {object}  id and type
 */
export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
}
