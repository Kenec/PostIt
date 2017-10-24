import express from 'express';
import controller from '../controller';
import jwtAuth from '../shared/middleware/jwtAuth';

const userRouter = express.Router();
const userController = controller.user;

userRouter.post('/api/v1/users/signup',
  userController.create);
userRouter.post('/api/v1/users/signin',
  userController.signin);
userRouter.post('/api/v1/users/resetpassword',
  userController.resetPassword);
userRouter.get('/api/v1/users/resetpassword/:token',
  userController.isTokenValid);
userRouter.post('/api/v1/users/resetpassword/:token',
  userController.updatePassword);
userRouter.post('/api/v1/users/username', jwtAuth,
  userController.fetchUserByName);

export default userRouter;
