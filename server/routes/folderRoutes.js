import express from 'express';
import { getAllFolders, createFolder, addFileToFolder, deleteFolder, deleteFile } from '../controllers/folderController.js';

const router = express.Router();

router.get('/', getAllFolders);
router.post('/', createFolder);
router.post('/:folderId/files', addFileToFolder);
router.delete('/:id', deleteFolder);
router.delete('/:folderId/files/:fileId', deleteFile);

export default router;
