import express from 'express';
import { logout, signin, signup } from '../controller/authRoute.js';
import { authCookie } from '../middleware/protectedRoute.js';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);
router.post('/logout', logout);
router.get('/me', authCookie, async (req, res) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findById(userId).select('_id username email');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
