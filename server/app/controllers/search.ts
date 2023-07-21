import { Op } from 'sequelize';
import { Request, Response } from 'express';
import User from '../models/User';
import Team from '../models/Team';
import Task from '../models/Task';
import Project from '../models/Project';

export const searchAll = async (req: Request, res: Response) => {
  const query = req.query.q;
  console.log(req.query);

  try {
    // Search in Users
    const users = (
      await User.findAll({
        attributes: { exclude: ['password'] },
        where: {
          [Op.or]: [
            { username: { [Op.iLike]: `%${query}%` } },
            { email: { [Op.iLike]: `%${query}%` } },
          ],
        },
      })
    ).map((user) => ({
      ...user.get(),
      tableName: 'User',
      id: user.get().user_id,
    }));

    // Search in Teams
    const teams = (
      await Team.findAll({
        where: { name: { [Op.iLike]: `%${query}%` } },
      })
    ).map((team) => ({
      ...team.get(),
      tableName: 'Team',
      id: team.get().team_id,
    }));

    // Search in Tasks
    const tasks = (
      await Task.findAll({
        where: { title: { [Op.iLike]: `%${query}%` } },
      })
    ).map((task) => ({
      ...task.get(),
      tableName: 'Task',
      id: task.get().task_id,
    }));

    // Search in Projects
    const projects = (
      await Project.findAll({
        where: { name: { [Op.iLike]: `%${query}%` } },
      })
    ).map((project) => ({
      ...project.get(),
      tableName: 'Project',
      id: project.get().project_id,
    }));

    // Combine all results into a single array
    const combinedResults = [...users, ...teams, ...tasks, ...projects];

    // Return all results
    res.json(combinedResults);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
