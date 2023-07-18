import { Request, Response } from 'express';
import Notification from '../models/Notifications';
import User from '../models/User';

//GET api/notifications
//Description: Get all notifications
export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.findAll();

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

//GET api/notifications/[id]
//Description: Get specific user notifications
export const getNotificationsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notifications = await Notification.findAll({
      where: { user_id: userId },
    });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};
