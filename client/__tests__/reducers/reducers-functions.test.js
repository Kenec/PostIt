// import
/* global expect */
import flashMessages from '../../reducers/flashMessages';
import group from '../../reducers/group';
import message from '../../reducers/message';
import userLoginReducer from '../../reducers/users';
import mockAction from '../../__mocks__/actions';

// Test flashmessage reducer
describe('FlashMessage reducers', () => {
  // test for adding message to the store using ADD_FLASH_MESSAGE action
  describe('When ADD_FLASH_MESSAGE action type is fired from an action', () => {
    it('should add message to the store', () => {
      const state = [];
      const action = mockAction.addFlashMessage;
      expect(flashMessages(state, action)).toEqual([
        { id: 1,
          type: 'success',
          text: 'This is a success message!'
        }
      ]);
    });
  });
  // Test for deleting message from the flasmessage store using message id
  describe('When DELETE_FLASH_MESSAGE action type is fired from action', () => {
    it('should remove message from the store', () => {
      const state = [];
      const action = mockAction.deleteFlashMessage;
      expect(flashMessages(state, action)).toEqual([]);
    });
  });
  // Test the default action (no action) to return default state
  describe('When No action is fired', () => {
    it('flash message reducer should return the default state', () => {
      const state = [];
      const action = {};
      expect(flashMessages(state, action)).toEqual(state);
    });
  });
});

// Test group reducer
describe('Group reducers', () => {
  // test create group reducers for adding created groups to the store
  describe('When CREATE_GROUP action type is fired from an action', () => {
    it('group should be created and pushed to the group store', () => {
      const state = {};
      const action = mockAction.createGroup;
      expect(group(state, action)).toEqual({ groupData: action.groupData });
    });
  });
  // Test GET_USER_GROUPS action for adding groups a user belonged to to
  // the store
  describe('When GET_USER_GROUPS action type is fired from action', () => {
    it('groups a user belonged to should be added to the store', () => {
      const state = {};
      const action = mockAction.getUserGroup;
      expect(group(state, action)).toEqual({ groups: action.groups });
    });
  });
  // Test GET_ADMIN_GROUPS
  // action for getting groups created by a user
  describe(`When GET_ADMIN_GROUPS
            action type is fired from action`, () => {
      it('groups a user created should be added to the store', () => {
        const state = {};
        const action = mockAction.getAdminGroup;
        expect(group(state, action))
          .toEqual({ groupsBelonged: action.groupsBelonged });
      });
    });
  // Test GET_USERS_IN_GROUP
  // action for getting users in a group
  describe(`When GET_USERS_IN_GROUP
            action type is fired from action`, () => {
      it('users in a group should be added to the store', () => {
        const state = {};
        const action = mockAction.getUsersInGroup;
        expect(group(state, action))
          .toEqual({ usersInGroup: action.usersInGroup });
      });
    });
  // Test SEARCH_ALL_USERS
  // action for getting all users availble
  describe(`When SEARCH_ALL_USERS
            action type is fired from action`, () => {
      it('all users should be added to the store', () => {
        const state = {};
        const action = mockAction.searchAllUser;
        expect(group(state, action))
          .toEqual({ searchedUsers: action.users });
      });
    });
  // Test default action type to return state
  describe('When No action is specified', () => {
    it('the state of the group store should be returned', () => {
      const state = {};
      const action = {};
      expect(group(state, action))
        .toEqual(state);
    });
  });
});

// Test Message reducer
describe('Message reducers', () => {
  // test create group reducers for adding created groups to the store
  describe('When COMPOSE_MESSAGE action type is fired from an action', () => {
    it('message should be added to the message store', () => {
      const state = {};
      const action = mockAction.composeMessage;
      expect(message(state, action))
        .toEqual({ messageData: action.messageData });
    });
  });
  // Test RETRIEVE_MESSAGE action for adding groups a user belonged to to
  // the store
  describe('When RETRIEVE_MESSAGE action type is fired from action', () => {
    it('messages should be retrieved from the store', () => {
      const state = {};
      const action = mockAction.retrieveMessage;
      expect(message(state, action))
        .toEqual({ messageData: action.retrieveMessages });
    });
  });
  // Test CLEAR_RETRIEVED_MESSAGE action for clearing
  // message from the message store
  describe(`When CLEAR_RETRIEVED_MESSAGE
      action type is fired from action`, () => {
      it('messages from the store should be cleared', () => {
        const state = {};
        const action = mockAction.clearRetrievedMessage;
        expect(message(state, action))
          .toEqual({ messageData: action.messageData });
      });
    });
  // Test GET_NOTIFICATION action for retrieving
  // message notification from the store
  describe(`When GET_NOTIFICATION
        action type is fired from action`, () => {
      it('notification should be retrieved from the store', () => {
        const state = {};
        const action = mockAction.getNotification;
        expect(message(state, action))
          .toEqual({ notificationData: action.notificationData });
      });
    });
  // Test UPDATE_NOTIFICATION action for updating
  // message notification in the store
  describe(`When UPDATE_NOTIFICATION
  action type is fired from action`, () => {
      it('notification should be updated in the store', () => {
        const state = {};
        const action = mockAction.updateNotification;
        expect(message(state, action))
          .toEqual({ messageData: action.messageData });
      });
    });
});

// User reducer
describe('User reducers', () => {
  // test create user reducers for adding logged in users to the store
  describe('When SET_CURRENT_USER action type is fired from an action', () => {
    it('current user should be added to the user store', () => {
      const state = {};
      const action = mockAction.setCurrentUser;
      expect(userLoginReducer(state, action))
        .toEqual(
          { isAuthenticated: true, user: { id: 1, username: 'Kene' } }
        );
    });
  });
  // test create user reducers for
  // returning default state when no action is fired
  describe('When No action type is fired from an action', () => {
    it('default state of user store returned', () => {
      const state = {};
      const action = {};
      expect(userLoginReducer(state, action))
        .toEqual({});
    });
  });
});
