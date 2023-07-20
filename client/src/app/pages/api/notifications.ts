import { Dispatch } from '@reduxjs/toolkit';
import { getNotifications } from '../../../services/features/notificationSlice';

const baseUrl = 'http://localhost:3001/api/notifications';
const headers = { 'Content-Type': 'application/json' };

export async function getUserNotifications(id: number) {
  const res = await fetch(`${baseUrl}/${id}`, { next: { revalidate: 15 } });

  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }

  const { notifications } = await res.json();
  return notifications;
}

export function getNotificationsForUser(userId: number) {
  return async (dispatch: Dispatch) => {
    try {
      const notifications = await getUserNotifications(userId);
      dispatch(getNotifications(notifications));
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };
}

export async function readNotification(id: number, userId: number) {
  try {
    const res = await fetch(`${baseUrl}/read/${id}`, {
      method: 'PUT',
      headers: headers,
      credentials: 'include',
    });

    if (res.ok) {
      getNotificationsForUser(userId);
    }
  } catch (error) {
    console.error('Failed to update notification', error);
  }
}
