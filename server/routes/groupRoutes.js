import express from 'express';
import controller from '../controller';
import jwtAuth from '../shared/middleware/jwtAuth';

const groupRouter = express.Router();
const groupController = controller.group;

groupRouter.post('/api/v1/groups', jwtAuth,
  groupController.create);
groupRouter.post('/api/v1/groups/creator', jwtAuth,
  groupController.fetchGroupByCreator);
groupRouter.get('/api/v1/groups/:groupid', jwtAuth,
  groupController.retrieve);

export default groupRouter;
