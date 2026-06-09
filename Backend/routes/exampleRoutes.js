import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/exampleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',       getAll);
router.get('/:id',    getById);
router.post('/',      protect, create);
router.put('/:id',    protect, update);
router.delete('/:id', protect, remove);

export default router;
