import About from '../models/About.js';

// Get about data
export const getAbout = async (req, res) => {
    try {
        // Get the first (and should be only) about document
        let about = await About.findOne();

        // If no about data exists, create default
        if (!about) {
            about = await About.create({
                name: 'Your Name',
                title: 'Full Stack Developer',
                description: 'Passionate developer with expertise in building modern web applications using the MERN stack. I love creating beautiful, performant, and user-friendly interfaces that deliver exceptional experiences.',
                avatar: '👨‍💻'
            });
        }

        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching about data', error: error.message });
    }
};

// Update about data
export const updateAbout = async (req, res) => {
    try {
        const { name, title, description, avatar } = req.body;

        // Find and update, or create if doesn't exist
        let about = await About.findOne();

        if (about) {
            about.name = name || about.name;
            about.title = title || about.title;
            about.description = description || about.description;
            about.avatar = avatar || about.avatar;
            await about.save();
        } else {
            about = await About.create({ name, title, description, avatar });
        }

        res.status(200).json(about);
    } catch (error) {
        res.status(400).json({ message: 'Error updating about data', error: error.message });
    }
};
