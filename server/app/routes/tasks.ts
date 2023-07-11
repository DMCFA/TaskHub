import express from 'express';
import {
  addTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTaskById,
} from '../controllers/tasks';
import { authenticateUser } from '../middleware/users';

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);
taskRouter.get('/:id', getTaskById);
taskRouter.post('/add', authenticateUser, addTask);
taskRouter.put('/:id', authenticateUser, editTask);
taskRouter.delete('/:id', authenticateUser, deleteTask);

export default taskRouter;
