import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../services/features/userSlice';
import { notificationSlice } from '../services/features/notificationSlice';
import { projectSlice } from '../services/features/projectSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notifications: notificationSlice.reducer,
    project: projectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
