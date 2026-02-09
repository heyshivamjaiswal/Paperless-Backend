import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Task from '../models/taskModel';

/**
 * GET all tasks for logged-in user
 */
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const tasks = await Task.find({ userId }).sort({ date: 1 }).lean();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

/**
 * CREATE new task
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { title, description, date, completed } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const task = await Task.create({
      userId,
      title,
      description: description || '',
      date: new Date(date),
      completed: completed ?? false,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};

/**
 * UPDATE task
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    // 🛡️ Fix for string | string[] + ObjectId validation
    if (Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findOneAndUpdate({ _id: id, userId }, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};

/**
 * DELETE task
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    // 🛡️ Fix for string | string[] + ObjectId validation
    if (Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
