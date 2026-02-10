import express from 'express';
import { authCookie } from '../middleware/protectedRoute';
import { getAIKey, updateAIKey } from '../controller/aiKeyController';

const router = express.Router();

router.use(authCookie);

router.get('/', getAIKey);
router.post('/', updateAIKey);

export default router;
