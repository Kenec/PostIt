import express from 'express';
import controller from '../controller';
import jwtAuth from '../shared/middleware/jwtAuth';

const groupUserRouter = express.Router();
const groupUserController = controller.groupUser;

groupUserRouter.post('/api/v1/groups/:groupId/user', jwtAuth,
  groupUserController.create);
groupUserRouter.post('/api/v1/groups/:id/users', jwtAuth,
  groupUserController.removeUser);
groupUserRouter.post('/api/v1/user/groups', jwtAuth,
  groupUserController.fetchUsersGroup);
groupUserRouter.post('/api/v1/users/:offset', jwtAuth,
  groupUserController.searchUser);
groupUserRouter.get('/api/v1/groups/:id/users', jwtAuth,
  groupUserController.getGroupMembers);
groupUserRouter.get('/api/v1/groups', jwtAuth,
  groupUserController.list);

export default groupUserRouter;
