import express from 'express';
import { getProfile, getRepos } from '../controllers/githubController.js';

const router = express.Router();

router.get('/profile', getProfile);
router.get('/repos', getRepos);

export default router;
