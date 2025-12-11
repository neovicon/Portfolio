import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';

const router = express.Router();

router.get('/', getAbout);
router.put('/', updateAbout);

export default router;
