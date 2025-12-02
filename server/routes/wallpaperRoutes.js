import express from 'express';
import { getWallpaper, updateWallpaper } from '../controllers/wallpaperController.js';

const router = express.Router();

router.get('/', getWallpaper);
router.put('/', updateWallpaper);

export default router;
