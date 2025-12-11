import Folder from '../models/Folder.js';

// Get all folders
export const getAllFolders = async (req, res) => {
    try {
        const folders = await Folder.find().sort({ createdAt: 1 });
        res.json(folders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch folders', message: error.message });
    }
};

// Create new folder
export const createFolder = async (req, res) => {
    try {
        const folder = new Folder(req.body);
        await folder.save();
        res.status(201).json(folder);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create folder', message: error.message });
    }
};

// Add file to folder
export const addFileToFolder = async (req, res) => {
    try {
        const { folderId } = req.params;
        const fileData = req.body;

        console.log('Adding file to folder:', folderId);
        console.log('File data:', fileData);

        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found' });
        }

        folder.files.push(fileData);
        await folder.save();

        res.json(folder);
    } catch (error) {
        console.error('Error adding file to folder:', error);
        res.status(400).json({ error: 'Failed to add file', message: error.message });
    }
};

// Delete folder
export const deleteFolder = async (req, res) => {
    try {
        const folder = await Folder.findByIdAndDelete(req.params.id);
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found' });
        }
        res.json({ message: 'Folder deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete folder', message: error.message });
    }
};

// Delete file from folder
export const deleteFile = async (req, res) => {
    console.log('Attempting to delete file. Params:', req.params);
    try {
        const { folderId, fileId } = req.params;
        const folder = await Folder.findById(folderId);

        if (!folder) {
            console.log('Folder not found:', folderId);
            return res.status(404).json({ error: 'Folder not found' });
        }

        const initialLength = folder.files.length;
        folder.files = folder.files.filter(file => file._id.toString() !== fileId);

        if (folder.files.length === initialLength) {
            console.log('File not found in folder:', fileId);
            // We can return 404 here if we want to be strict, or just success
        }

        await folder.save();
        console.log('File deleted successfully');

        res.json(folder);
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file', message: error.message });
    }
};
