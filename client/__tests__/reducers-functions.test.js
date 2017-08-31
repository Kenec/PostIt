// import
import flashMessages from '../reducers/flashMessages';
import userLoginReducer from '../reducers/users';
import group from '../reducers/group';
import message from '../reducers/message';
import { ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
  CREATE_GROUP,
  GET_USER_GROUPS,
  GET_GROUPS_CREATED_BY_USER,
  GET_USERS_IN_GROUP,
  SEARCH_ALL_USERS,
  COMPOSE_MESSAGE,
  RETRIEVE_MESSAGE,
  CLEAR_RETRIEVED_MESSAGE,
  GET_NOTIFICATION
} from '../actions/types';

// Test flashmessage reducer
describe('FlashMessage reducers', () => {
  // test for adding message to the store using ADD_FLASH_MESSAGE action
  describe('When ADD_FLASH_MESSAGE action type is fired from an action', () => {
    it('should add message to the store', () => {
      const state = [];
      const action = {
        type: ADD_FLASH_MESSAGE,
        message: {
          type: 'success',
          text: 'This is a success message!'
        } };
      expect(flashMessages(state, action)).toEqual([
        { id: 1,
          type: 'success',
          text: 'This is a success message!' }
      ]);
    });
  });
  // Test for deleting message from the flasmessage store using message id
  describe('When DELETE_FLASH_MESSAGE action type is fired from action', () => {
    it('should remove message from the store', () => {
      const state = [];
      const action = {
        type: DELETE_FLASH_MESSAGE,
        id: 1
      };
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
      const action = {
        type: CREATE_GROUP,
        groupData: {
          groupName: 'Group',
          createdby: 1
        } };
      expect(group(state, action)).toEqual({ groupData: action.groupData });
    });
  });
  // Test GET_USER_GROUPS action for adding groups a user belonged to to
  // the store
  describe('When GET_USER_GROUPS action type is fired from action', () => {
    it('groups a user belonged to should be added to the store', () => {
      const state = {};
      const action = {
        type: GET_USER_GROUPS,
        groups: {
          id: 1,
          groupName: 'Group'
        }
      };
      expect(group(state, action)).toEqual({ groups: action.groups });
    });
  });
  // Test GET_GROUPS_CREATED_BY_USER
  // action for getting groups created by a user
  describe(`When GET_GROUPS_CREATED_BY_USER
              action type is fired from action`, () => {
      it('groups a user created should be added to the store', () => {
        const state = {};
        const action = {
          type: GET_GROUPS_CREATED_BY_USER,
          groupsByUser: {
            id: 1,
            groupName: 'Group'
          }
        };
        expect(group(state, action))
          .toEqual({ groupsByUser: action.groupsByUser });
      });
    });
  // Test GET_USERS_IN_GROUP
  // action for getting users in a group
  describe(`When GET_USERS_IN_GROUP
                action type is fired from action`, () => {
      it('users in a group should be added to the store', () => {
        const state = {};
        const action = {
          type: GET_USERS_IN_GROUP,
          usersInGroup: {
            id: 1,
            username: 'Kene',
            email: 'kene@gmail.com',
            phone: '07038550515'
          }
        };
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
        const action = {
          type: SEARCH_ALL_USERS,
          users: [
            {
              id: 1,
              username: 'Kene',
              email: 'kene@gmail.com',
              phone: '07038550515'
            },
            {
              id: 2,
              username: 'Obi',
              email: 'obi@gmail.com',
              phone: '07038550515'
            },
          ]
        };
        expect(group(state, action))
          .toEqual({ searchedUsers: action.users });
      });
    });
  // Test default action type
  // to return state
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
      const action = {
        type: COMPOSE_MESSAGE,
        messageData: {
          id: 1,
          message: 'Hello Obi! Welcome',
          priority_level: 'Normal',
          groupId: 1,
          sentBy: 1,
          createdAt: '2017-08-15T11:10:50.743Z'
        } };
      expect(message(state, action))
        .toEqual({ messageData: action.messageData });
    });
  });
  // Test RETRIEVE_MESSAGE action for adding groups a user belonged to to
  // the store
  describe('When RETRIEVE_MESSAGE action type is fired from action', () => {
    it('messages should be retrieved from the store', () => {
      const state = {};
      const action = {
        type: RETRIEVE_MESSAGE,
        messageData: {
          id: 1,
          message: 'Hello Obi! Welcome',
          priority_level: 'Normal',
          groupId: 1,
          sentBy: 1,
          createdAt: '2017-08-15T11:10:50.743Z'
        }
      };
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
        const action = {
          type: CLEAR_RETRIEVED_MESSAGE,
          messageData: []
        };
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
        const action = {
          type: GET_NOTIFICATION,
          notificationData: {
            id: 1,
            message: 'Hello Obi! Welcome',
            priority_level: 'Normal',
            groupId: 1,
            sentBy: 1,
            createdAt: '2017-08-15T11:10:50.743Z'
          }
        };
        expect(message(state, action))
          .toEqual({ notificationData: action.notificationData });
      });
    });
});
