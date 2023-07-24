import { Request, Response } from 'express';
import Project from '../models/Project';
import UserTeam from '../models/UserTeam';
import UserProject from '../models/UserProject';
import User from '../models/User';

// GET /api/projects
// Description: Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving projects' });
  }
};

// GET /api/projects/:id
// Description: Get a specific project by ID
export const getProjectById = async (req: Request, res: Response) => {
  const projectId = parseInt(req.params.id);

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving project' });
  }
};

// GET /api/projects/:id/users
// Description: Get all users assigned to a specific project
export const getProjectUsers = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({
      where: { project_id: id },
      include: [
        {
          model: User,
          as: 'users',
          through: { attributes: [] },
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ users: project.users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting users for the project' });
  }
};

// POST /api/projects
// Description: Create a new project
export const createProject = async (req: Request, res: Response) => {
  const { name, description, start_date, end_date, team_id, users } = req.body;
  const project_manager = req.user?.user_id;

  try {
    const project = await Project.create({
      name,
      description,
      start_date,
      end_date,
      project_manager,
      team_id,
    });

    const userIds = new Set(users);
    userIds.add(project_manager);

    const teamUsers = await UserTeam.findAll({ where: { team_id } });
    for (let user of teamUsers) {
      userIds.add(user.get('user_id'));
    }

    for (let userId of userIds) {
      await UserProject.create({
        user_id: userId,
        project_id: project.get('project_id'),
      });
    }

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating project' });
  }
};

// PUT /api/projects/:id
// Description: Update a project
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user?.user_id;
  const {
    name,
    description,
    start_date,
    end_date,
    project_manager,
    team_id,
    users,
  } = req.body;

  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (
      user.get('user_id') === project.get('project_manager') ||
      user.get('is_admin')
    ) {
      // Update project details
      await project.update({
        name,
        description,
        start_date,
        end_date,
        project_manager,
        team_id,
      });

      // Delete existing associations
      await UserProject.destroy({ where: { project_id: id } });

      // Create new associations
      const teamUsers = await UserTeam.findAll({ where: { team_id } });

      for (let user of teamUsers) {
        await UserProject.create({
          user_id: user.get('user_id'),
          project_id: project.get('project_id'),
        });
      }

      for (let userId of users) {
        await UserProject.create({
          user_id: userId,
          project_id: project.get('project_id'),
        });
      }

      res
        .status(200)
        .json({ message: 'Project updated successfully', project });
    } else {
      res
        .status(403)
        .json({ error: 'User is not authorized to update this project' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating project' });
  }
};

// DELETE /api/projects/:id
// Description: Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.user?.user_id;

  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (
      user.get('user_id') === project.get('project_manager') ||
      user.get('is_admin')
    ) {
      await project.destroy();
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res
        .status(403)
        .json({ error: 'User is not authorized to delete this project' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting project' });
  }
};
