import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';
import { validateTaskId } from '../middleware/validateTaskId.js';

const router = express.Router();

router.get('/', taskController.getTasks);

router.get('/:id', validateTaskId, taskController.getTaskById);

router.post('/', validateTask, taskController.createTask);

export default router;
