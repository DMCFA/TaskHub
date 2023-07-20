import express from 'express';
import {
  deleteNotifications,
  getAllNotifications,
  getNotificationsByUserId,
  updateNotificationReadStatus,
} from '../controllers/notifications';
import { authenticateUser, checkAdmin } from '../middleware/users';

const notificationRouter = express.Router();

notificationRouter.get('/', authenticateUser, checkAdmin, getAllNotifications);
notificationRouter.get('/:id', getNotificationsByUserId);
notificationRouter.put('/read/:id', updateNotificationReadStatus);
notificationRouter.delete('/:id', authenticateUser, deleteNotifications);

export default notificationRouter;
