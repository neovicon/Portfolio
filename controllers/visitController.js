import Visit from '../models/Visit.js';

// Log a visit
export const logVisit = async (req, res) => {
    try {
        const { path } = req.body || {};
        const visit = new Visit({
            ip: req.ip,
            path: path || '/',
            userAgent: req.get('User-Agent')
        });
        await visit.save();
        res.status(201).json({ message: 'Visit logged successfully' });
    } catch (error) {
        console.error('Visit Logging Error:', error);
        res.status(500).json({
            error: 'Failed to log visit',
            message: error.message
        });
    }
};

// Get visit stats
export const getVisits = async (req, res) => {
    try {
        const totalVisits = await Visit.countDocuments();
        const uniqueIps = await Visit.distinct('ip');

        res.json({
            total: totalVisits,
            unique: uniqueIps.length
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch visits',
            message: error.message
        });
    }
};
