import bycript from 'bcrypt';
import User from '../models/User';
import { Request, Response } from 'express';

//GET api/users
//Description: Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error in getting all users', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//POST api/user
//Description: Register users
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password } = req.body;

    //check if user/email are unique to DB
    const existingUser = await User.findOne({
      where: {
        $or: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'Username or email already exists' });
    }

    //hash password
    const hashedPassword = await bycript.hash(password, 10);

    //create user
    const newUser = await User.create({
      username,
      fname: name,
      email,
      password: hashedPassword,
      created_on: new Date(),
      last_login: null,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in user registration', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
