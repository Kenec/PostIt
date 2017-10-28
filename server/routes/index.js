import express from 'express';
import path from 'path';
import userRouter from './userRoutes';
import groupRouter from './groupRoutes';
import messageRouter from './messageRoutes';
import groupUserRouter from './groupUserRoutes';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

router.use('/', userRouter);
router.use('/', groupRouter);
router.use('/', messageRouter);
router.use('/', groupUserRouter);

router.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

export default router;
