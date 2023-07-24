import express from 'express';
import { authenticateUser } from '../middleware/users';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectUsers,
  updateProject,
} from '../controllers/projects';

const projectRouter = express.Router();

projectRouter.get('/', getAllProjects);
projectRouter.get('/:id', getProjectById);
projectRouter.get('/:id/users', getProjectUsers);
projectRouter.post('/', authenticateUser, createProject);
projectRouter.put('/:id', authenticateUser, updateProject);
projectRouter.delete('/:id', authenticateUser, deleteProject);

export default projectRouter;
