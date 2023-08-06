import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import User from '../models/User';
import {
  generateToken,
  sessionExpirationDate,
  verifyToken,
} from '../../utils/tokenUtils';
import { UserAttributes, UserInstance } from '../../types/User';
import { Task } from '../../config/associations';
import Team from '../models/Team';
import UserTeam from '../models/UserTeam';
import UserProject from '../models/UserProject';

//GET api/users
//Description: Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error in getting all users', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//GET api/users/[id]
//Description: Get user details
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Task, as: 'tasks' }],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error retrieving user information:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//POST api/users/register
//Description: Register users
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, fname, email, password } = req.body;

    //check if user/email are unique to DB
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'Username or email already exists' });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const newUser = await User.create({
      username,
      fname,
      email,
      password: hashedPassword,
      created_on: new Date(),
      last_login: null,
    } as UserAttributes);

    const userInstance = newUser as UserInstance;
    const { password: excludePassword, ...userRes } = newUser.toJSON();

    //generate session token
    const { user_id } = userInstance;
    const token = generateToken(user_id);

    //update login time
    await newUser.update({ last_login: new Date() });

    res.cookie('access_token', token, {
      expires: sessionExpirationDate(),
      httpOnly: true,
    });

    return res.status(201).json({ newUser: userRes, token });
  } catch (error) {
    console.error('Error in user registration', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//POST api/users/login
//Description: Login users
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username or email
    const user = await User.findOne({
      where: { [Op.or]: [{ username }, { email: username }] },
      include: [{ model: Task, as: 'tasks' }],
    });

    // User not found/password mismatch
    if (!user || !(await user.isValidPassword(password))) {
      return res
        .status(401)
        .json({ error: 'Invalid username/email or password' });
    }

    // Generate session token
    const token = generateToken(user.user_id);

    // Update last login timestamp
    await user.update({ last_login: new Date() });

    //remove password from response
    const { password: excludePassword, ...userRes } = user.toJSON();

    //add session cookie
    res.cookie('access_token', token, {
      expires: sessionExpirationDate(),
      httpOnly: true,
    });

    res.status(200).json({ user: userRes, token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

//POST api/users/logout
//Description: Logout user
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie('access_token');

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging out user' });
  }
};

//PUT api/users/:id
//Description: Update user properties
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, fname, password } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    //update user fields
    user.username = username ?? user.username;
    user.fname = fname ?? user.fname;
    user.email = email ?? user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user', error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

//DELETE api/users/:id
//Description: Delete user from DB
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // Check if the user performing the deletion is the same user or an admin

    const user = await User.findOne({
      where: { user_id: loggedInUser.user_id },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    if (user.user_id !== Number(id) && !user.is_admin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    //delete user from DB

    await user.destroy();

    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting user', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//POST api/users/newuser-auth
// Description: Check if the user is authenticated
export const checkAuthStatus = async (req: Request, res: Response) => {
  try {
    // Check if the access_token cookie exists
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Verify the token and extract the user information
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // User is authenticated, return the user object
    const userObj = decodedToken as UserInstance;
    const user = await User.findOne({
      where: { user_id: userObj.user_id },
      include: [{ model: Task, as: 'tasks' }],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: excludePassword, ...userRes } = user.toJSON();

    res.status(200).json({ user: userRes });
  } catch (error) {
    console.error('Error checking authentication', error);
    res.status(500).json({ error: 'Error checking authentication' });
  }
};

//GET api/users/teams/:id
//Description: Get all teams from an user
export const getUserTeams = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userTeams = await UserTeam.findAll({ where: { user_id: id } });
    const teams = [];

    for (let userTeam of userTeams) {
      const team = await Team.findOne({ where: { team_id: userTeam.team_id } });
      teams.push(team);
    }

    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Error getting teams for user' });
  }
};

// GET /api/users/projects/:id
// Description: Get all projects of a specific user
export const getUserProjects = async (req: Request, res: Response) => {
  const { id: stringId } = req.params;
  const userId = parseInt(stringId);

  try {
    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all projects associated with the user
    const projects = await user.getProjects();

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving user projects' });
  }
};
