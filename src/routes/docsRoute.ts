import express from 'express';
import { authCookie } from '../middleware/protectedRoute';
import {
  createDocument,
  deleteDocument,
  getAllDocument,
  getDocumentById,
  updateDocument,
} from '../controller/documentRoute';

const router = express.Router();

router.use(authCookie);

router.post('/', createDocument);
router.get('/', getAllDocument);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;
