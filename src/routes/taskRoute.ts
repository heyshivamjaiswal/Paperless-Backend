import express from 'express';
import { authCookie } from '../middleware/protectedRoute';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controller/taskController';

const router = express.Router();

router.use(authCookie);

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
