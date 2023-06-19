import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../../utils/tokenUtils';
import { UserAttributes, UserInstance } from '../../types/User';

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

    //generate session token
    const { user_id } = userInstance;
    const token = generateToken(user_id);

    //update login time
    await newUser.update({ last_login: new Date() });

    return res.status(201).json(newUser);
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

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
