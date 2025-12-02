import Project from '../models/Project.js';

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch projects',
            message: error.message
        });
    }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch project',
            message: error.message
        });
    }
};

// Create new project (for seeding/admin)
export const createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({
            error: 'Failed to create project',
            message: error.message
        });
    }
};
