import { Request, Response } from 'express';
import Team from '../models/Team';
import UserTeam from '../models/UserTeam';
import User from '../models/User';
import sequelize from '../../config/database';

//GET api/teams
//Description: Get all teams
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.findAll();
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//GET api/teams/:id
//Description: Get team by id
export const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const team = await Team.findOne({
      where: { team_id: id },
      include: [
        {
          model: User,
          as: 'users',
          through: { attributes: ['is_admin'] },
        },
      ],
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching team' });
  }
};

//POST api/teams
//Description: Create team
export const createTeam = async (req: Request, res: Response) => {
  const { name, description, users } = req.body;
  const admin = req.user?.user_id;
  console.log(admin);

  // Ensure the admin is included in the users list
  if (!users.includes(admin)) {
    users.push(admin);
  }

  const transaction = await sequelize.transaction();

  try {
    const newTeam = await Team.create(
      {
        name,
        description,
      },
      { transaction }
    );

    // add users to team
    for (let userId of users) {
      await UserTeam.create(
        {
          user_id: userId,
          team_id: newTeam.team_id,
          is_admin: userId === admin,
        },
        { transaction }
      );
    }

    await transaction.commit();

    res
      .status(201)
      .json({ message: 'Team created successfully', team: newTeam });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error creating team' });
  }
};

//PUT api/teams/:id
//Description: Update team
export const updateTeam = async (req: Request, res: Response) => {
  const { name, description, users, admin } = req.body;
  const { id } = req.params;
  const userId = req.user?.user_id;

  try {
    const userTeam = await UserTeam.findOne({
      where: { team_id: id, user_id: userId },
    });

    if (!userTeam || !userTeam.is_admin) {
      return res
        .status(403)
        .json({ error: 'User is not an admin of the team' });
    }

    await Team.update({ name, description }, { where: { team_id: id } });

    // remove existing users from team
    await UserTeam.destroy({ where: { team_id: id } });

    // add new users to team
    const allUsers = [...users, userId];
    for (let userId of allUsers) {
      await UserTeam.create({
        user_id: userId,
        team_id: id,
        is_admin: userId === admin,
      });
    }
    res.status(200).json({ message: 'Team updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating team' });
  }
};

//DELETE api/teams/:id
//Description: Delete a team
export const deleteTeam = async (req: Request, res: Response) => {
  const { id: stringId } = req.params;
  const userId = req.user?.user_id;
  const id = parseInt(stringId);

  try {
    // Check if the user is an admin for the team or is a global admin
    const user = await User.findByPk(userId);
    const userTeam = await UserTeam.findOne({
      where: { team_id: id, user_id: userId },
    });

    if (!user || (!user.is_admin && (!userTeam || !userTeam.is_admin))) {
      return res.status(403).json({
        error:
          'User is not an admin or does not have the necessary permissions to delete the team',
      });
    }

    // Remove all users from the team
    await UserTeam.destroy({ where: { team_id: id } });

    // Delete the team
    const deletedRowCount = await Team.destroy({ where: { team_id: id } });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Team does not exist' });
    }

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting team' });
  }
};
