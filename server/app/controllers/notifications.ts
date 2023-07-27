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
    const userId = req.params.id;

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

// PUT /api/notifications/read/:notificationId
// Description: Edit a notification
export const updateNotificationReadStatus = async (
  req: Request,
  res: Response
) => {
  const { id: notificationId } = req.params;

  try {
    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Update the read_status to "read"
    notification.read_status = 'read';
    await notification.save();

    res
      .status(200)
      .json({ message: 'Notification updated successfully', notification });
  } catch (error) {
    console.error('Error editing notification:', error);
    res.status(500).json({ error: 'Failed to edit notification' });
  }
};

//DELETE api/notifications/:id
//Description: Delete notifications
export const deleteNotifications = async (req: Request, res: Response) => {
  const { notificationIds, destroyAll } = req.body;

  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (notificationIds && notificationIds.length > 0) {
      await Notification.destroy({
        where: { notification_id: notificationIds },
      });
    } else if (user && destroyAll) {
      await Notification.destroy({ where: { user_id: userId } });
    } else {
      return res.status(400).json({ error: 'Invalid input' });
    }

    res.status(200).json({ message: 'Notifications deleted successfully' });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    res.status(500).json({ error: 'Failed to delete notifications' });
  }
};
