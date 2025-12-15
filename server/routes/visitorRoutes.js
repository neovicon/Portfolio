import express from 'express';
import { trackVisit } from '../controllers/visitorController.js';

const router = express.Router();

router.get('/visits', trackVisit);

export default router;
