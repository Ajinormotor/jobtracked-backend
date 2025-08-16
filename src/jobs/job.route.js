import express from 'express';
import { createJob, deleteJob, getJobs, updateJob } from '../jobs/job.controller.js';
import protect from '../middleware/auth.middleware.js';



const router = express.Router();

router.get('/', protect, getJobs );
router.post('/', protect, createJob );
router.put('/:id',protect, updateJob );
router.delete('/:id', protect, deleteJob );

export default router;