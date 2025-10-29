import { param, validationResult } from 'express-validator';
import { findById } from '../repositories/taskRepo.js';

export const validateTaskId = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('ID is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('ID must be a positive integer')
    .toInt()
    .bail()
    .custom(async (id, { req }) => {
      const task = await findById(id);
      if (!task) {
        throw new Error('Task not found');
      }
      req.task = task; // attach the task to the request
      return true;
    }),

  // Inline equivalent of checkValidationResults (to return 404)
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      if (firstError.msg === 'Task not found') {
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.status(400).json({ error: firstError.msg });
    }
    next();
  },
];