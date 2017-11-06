import express from 'express';
import controller from '../controller';
import jwtAuth from '../shared/middleware/jwtAuth';

const groupRouter = express.Router();
const groupController = controller.group;

groupRouter.post('/api/v1/groups', jwtAuth,
  groupController.create);
groupRouter.post('/api/v1/groups/creator', jwtAuth,
  groupController.getOwnerGroups);
groupRouter.get('/api/v1/groups/:groupId', jwtAuth,
  groupController.retrieve);

export default groupRouter;
