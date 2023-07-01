import express from 'express';
import {
  checkAuthStatus,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from '../controllers/users';
import { authenticateUser } from '../middleware/users';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/newuser-auth', checkAuthStatus);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.put('/:id', authenticateUser, updateUser);
userRouter.delete('/:id', authenticateUser, deleteUser);

export default userRouter;
