import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken, sessionExpirationDate } from '../../utils/tokenUtils';
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

    console.log(req.params);
    console.log(loggedInUser);

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
