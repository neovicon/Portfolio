import express from 'express';
import { getFolders } from '../controllers/folderController.js';

const router = express.Router();

router.get('/', getFolders);

export default router;
