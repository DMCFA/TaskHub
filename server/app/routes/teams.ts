import express from 'express';
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
} from '../controllers/teams';
import { authenticateUser } from '../middleware/users';

const teamsRouter = express.Router();

teamsRouter.get('/', getAllTeams);
teamsRouter.get('/:id', getTeamById);
teamsRouter.post('/', authenticateUser, createTeam);
teamsRouter.put('/:id', authenticateUser, updateTeam);
teamsRouter.delete('/:id', authenticateUser, deleteTeam);

export default teamsRouter;
