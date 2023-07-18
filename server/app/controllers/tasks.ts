import { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';
import Notification from '../models/Notifications';

//GET api/tasks
//Description: Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error in getting all tasks', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//GET api/tasks/[id]
//Description: Get task details
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'task not found' });
    }

    return res.json(task);
  } catch (error) {
    console.error('Error retrieving task information:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//POST api/tasks/add/uid=[id]
//Description: Add task
export const addTask = async (req: Request, res: Response) => {
  try {
    // Get data and authenticate
    const {
      title,
      description,
      status,
      priority,
      due_date,
      start_date,
      completion_date,
      tags,
      attachments,
      subtasks,
      followers,
      estimated_time,
      actual_time,
      task_dependencies,
      assigned_user_id,
      project_id,
    } = req.body;
    const { uid } = req.query;
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const user = await User.findOne({
      where: { user_id: loggedInUser.user_id },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    if (user.user_id !== Number(uid) && !user.is_admin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Create a new task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      due_date,
      start_date,
      completion_date,
      tags,
      attachments,
      subtasks,
      followers,
      estimated_time,
      actual_time,
      task_dependencies,
      assigned_user_id: Number(uid),
      project_id,
      created_on: new Date(),
    });

    // Save the task to the database
    await task.save();

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// PUT /api/tasks/:taskId
// Description: Update a task
export const editTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const user = await User.findOne({
      where: { user_id: loggedInUser.user_id },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if the logged-in user is the assigned user of the task or an admin
    if (task.assigned_user_id !== loggedInUser.user_id && !user.is_admin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update the task
    await task.update(req.body);

    //Create a new notification for the task update
    const notificationMessage = `Task "${task.title}" has been updated.`;
    const notification = await Notification.create({
      user_id: task.assigned_user_id,
      message: notificationMessage,
    });

    res
      .status(200)
      .json({ message: 'Task updated successfully', task, notification });
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).json({ error: 'Failed to edit task' });
  }
};

// DELETE /api/tasks/:taskId
// Description: Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const user = await User.findOne({
      where: { user_id: loggedInUser.user_id },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if the logged-in user is the assigned user of the task or an admin
    if (task.assigned_user_id !== loggedInUser.user_id && !user.is_admin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete the task
    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
