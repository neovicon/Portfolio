import express from 'express';
import { logVisit, getVisits } from '../controllers/visitController.js';

const router = express.Router();

router.post('/', logVisit);
router.get('/', getVisits);

export default router;
