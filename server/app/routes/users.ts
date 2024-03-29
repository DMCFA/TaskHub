import express from 'express';
import {
  checkAuthStatus,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProjects,
  getUserTasks,
  getUserTeams,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from '../controllers/users';
import { authenticateUser } from '../middleware/users';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.get('/teams/:id', getUserTeams);
userRouter.get('/projects/:id', getUserProjects);
userRouter.get('/tasks/:id', getUserTasks);
userRouter.post('/newuser-auth', checkAuthStatus);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.put('/:id', authenticateUser, updateUser);
userRouter.delete('/:id', authenticateUser, deleteUser);

export default userRouter;
