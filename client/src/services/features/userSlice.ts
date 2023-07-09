import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface User {
  user_id: number;
  username: string;
  fname: string;
  email: string;
  created_on: Date;
  last_login: Date | null;
  is_admin: boolean;
}

interface UserState {
  isActive: boolean;
  user: User | null;
}

const initialState: UserState = {
  isActive: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      (state.isActive = true), (state.user = action.payload);
    },
    logout: (state, action: PayloadAction<User>) => {
      (state.isActive = false), (state.user = null);
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      (state.isActive = true), (state.user = action.payload);
    },
  },
});

export const { loginSuccess, logout, signupSuccess } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
