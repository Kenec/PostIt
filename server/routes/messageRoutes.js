import express from 'express';
import controller from '../controller';
import jwtAuth from '../shared/middleware/jwtAuth';

const messageRouter = express.Router();
const messageController = controller.message;

messageRouter.post('/api/v1/groups/:groupId/message', jwtAuth,
  messageController.create);
messageRouter.get('/api/v1/groups/:groupId/messages', jwtAuth,
  messageController.retrieve);
messageRouter.post('/api/v1/groups/:messageId/notification', jwtAuth,
  messageController.addNotification);
messageRouter.post('/api/v1/groups/:messageId/updateReadBy', jwtAuth,
  messageController.updateReadBy);
messageRouter.post('/api/v1/user/notifications', jwtAuth,
  messageController.getNotification);
messageRouter.post('/api/v1/user/:messageId/notification', jwtAuth,
  messageController.updateNotification);
messageRouter.post('/api/v1/users/:messageId/read', jwtAuth,
  messageController.getReadBy);

export default messageRouter;
