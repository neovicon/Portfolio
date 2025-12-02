import Wallpaper from '../models/Wallpaper.js';

// Get wallpaper
export const getWallpaper = async (req, res) => {
    try {
        // Get the default wallpaper
        let wallpaper = await Wallpaper.findOne({ isDefault: true });

        // If no wallpaper exists, create default
        if (!wallpaper) {
            wallpaper = await Wallpaper.create({
                wallpaperId: 'gradient-1',
                isDefault: true
            });
        }

        res.status(200).json(wallpaper);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wallpaper', error: error.message });
    }
};

// Update wallpaper
export const updateWallpaper = async (req, res) => {
    try {
        const { wallpaperId } = req.body;

        // Find and update, or create if doesn't exist
        let wallpaper = await Wallpaper.findOne({ isDefault: true });

        if (wallpaper) {
            wallpaper.wallpaperId = wallpaperId;
            await wallpaper.save();
        } else {
            wallpaper = await Wallpaper.create({ wallpaperId, isDefault: true });
        }

        res.status(200).json(wallpaper);
    } catch (error) {
        res.status(400).json({ message: 'Error updating wallpaper', error: error.message });
    }
};
