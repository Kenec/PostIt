import express from 'express';
import userRouter from './userRoutes';
import groupRouter from './groupRoutes';
import messageRouter from './messageRoutes';
import groupUserRouter from './groupUserRoutes';

const router = express.Router();

router.use('/', userRouter);
router.use('/', groupRouter);
router.use('/', messageRouter);
router.use('/', groupUserRouter);

export default router;
