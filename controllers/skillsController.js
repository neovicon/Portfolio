import Skills from '../models/Skills.js';

// Get all skills
export const getSkills = async (req, res) => {
    try {
        let skills = await Skills.find().sort({ order: 1 });

        // If no skills exist, create defaults
        if (skills.length === 0) {
            const defaultSkills = [
                { category: 'Frontend', items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'], order: 1 },
                { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'], order: 2 },
                { category: 'Tools', items: ['Git', 'Vite', 'npm', 'VS Code'], order: 3 },
                { category: 'Soft Skills', items: ['Problem Solving', 'Communication', 'Team Collaboration'], order: 4 }
            ];

            skills = await Skills.insertMany(defaultSkills);
        }

        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching skills', error: error.message });
    }
};

// Create new skill category
export const createSkillCategory = async (req, res) => {
    try {
        const { category, items, order } = req.body;

        const newSkill = await Skills.create({ category, items, order });
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(400).json({ message: 'Error creating skill category', error: error.message });
    }
};

// Update skill category
export const updateSkillCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, items, order } = req.body;

        const skill = await Skills.findByIdAndUpdate(
            id,
            { category, items, order },
            { new: true, runValidators: true }
        );

        if (!skill) {
            return res.status(404).json({ message: 'Skill category not found' });
        }

        res.status(200).json(skill);
    } catch (error) {
        res.status(400).json({ message: 'Error updating skill category', error: error.message });
    }
};

// Delete skill category
export const deleteSkillCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skills.findByIdAndDelete(id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill category not found' });
        }

        res.status(200).json({ message: 'Skill category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting skill category', error: error.message });
    }
};
