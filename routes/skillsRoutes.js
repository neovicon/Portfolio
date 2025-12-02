import express from 'express';
import { getSkills, createSkillCategory, updateSkillCategory, deleteSkillCategory } from '../controllers/skillsController.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', createSkillCategory);
router.put('/:id', updateSkillCategory);
router.delete('/:id', deleteSkillCategory);

export default router;
