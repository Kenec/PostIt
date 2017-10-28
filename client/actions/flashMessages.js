// import
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

/**
 * Add flash message to the store
 * @function addFlashMessage
 * @param  {string} message - message to be added
 * @return {object} - message and types
 */
export const addFlashMessage = message => (
  {
    type: ADD_FLASH_MESSAGE,
    message
  }
);

/**
 * Delete Flash message to the store
 * @function deleteFlashMessage
 * @param  {number} id  - message id
 * @return {object}  id and type
 */
export const deleteFlashMessage = id => (
  {
    type: DELETE_FLASH_MESSAGE,
    id
  }
);
