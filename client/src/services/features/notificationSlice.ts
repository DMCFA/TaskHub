import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Notification {
  notification_id: number;
  user_id: number;
  message: string;
  timestamp: Date;
  read_status: 'read' | 'unread';
}

interface NotificationState {
  hasNotifications: boolean;
  notifications: Notification[] | null;
}

const initialState: NotificationState = {
  hasNotifications: false,
  notifications: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotifications: (state, action: PayloadAction<Notification[]>) => {
      (state.hasNotifications = true), (state.notifications = action.payload);
    },
  },
});

export const { getNotifications } = notificationSlice.actions;

export const selectNotifications = (state: RootState) => state.notifications;

export default notificationSlice.reducer;
