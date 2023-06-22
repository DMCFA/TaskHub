import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/users';
import { authenticateUser } from '../middleware/users';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/:id', authenticateUser, updateUser);
userRouter.delete('/:id', authenticateUser, deleteUser);

export default userRouter;