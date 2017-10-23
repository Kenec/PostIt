import express from 'express';
import controller from '../controller';
import jwtAuth from '../shared/middleware/jwtAuth';

const messageRouter = express.Router();
const messageController = controller.message;

messageRouter.post('/api/v1/groups/:groupid/message', jwtAuth,
  messageController.create);
messageRouter.get('/api/v1/groups/:groupid/messages', jwtAuth,
  messageController.retrieve);
messageRouter.post('/api/v1/groups/:messageid/notification', jwtAuth,
  messageController.addMessageNotification);
messageRouter.post('/api/v1/groups/:messageid/updateReadBy', jwtAuth,
  messageController.updateReadBy);
messageRouter.post('/api/v1/user/notifications', jwtAuth,
  messageController.getMessageNotification);
messageRouter.post('/api/v1/user/:messageid/notification', jwtAuth,
  messageController.updateMessageNotification);
messageRouter.post('/api/v1/users/:messageid/read', jwtAuth,
  messageController.getReadBysInGroup);

export default messageRouter;
