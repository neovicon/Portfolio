import Visitor from '../models/Visitor.js';
import crypto from 'crypto';

export const trackVisit = async (req, res) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'] || 'unknown';

        // Create a hash of IP + UserAgent to anonymize and identify unique visitors
        const hash = crypto
            .createHash('sha256')
            .update(`${ip}-${userAgent}`)
            .digest('hex');

        let visitor = await Visitor.findOne({ ipHash: hash });

        let isNewVisit = false;

        if (!visitor) {
            // New visitor
            visitor = new Visitor({
                ipHash: hash,
                userAgent: userAgent
            });
            isNewVisit = true;
        } else {
            // Existing visitor
            // Check if last visit was more than 24 hours ago (optional logic, but good for "daily unique")
            // OR just update lastVisit time. 
            // The requirement says "Increments the count only if the visitor is new".
            // This usually means "new unique visitor" ever, OR "new session".
            // Let's stick to "unique visitor" based on the requirement "Track unique visitors".
            // But usually we want to know total hits vs unique visitors.
            // The requirement says "Returns { totalVisits: number }".
            // And "Increments the count only if the visitor is new".

            // If we strictly follow "Increments the count only if the visitor is new", 
            // then we only increment if `!visitor`.

            // However, updating `lastVisit` is good practice.
            visitor.lastVisit = Date.now();
            visitor.visits += 1; // Track total visits for this user
        }

        await visitor.save();

        // Count total unique visitors
        const totalVisits = await Visitor.countDocuments();

        res.json({ totalVisits });
    } catch (error) {
        console.error('Error tracking visit:', error);
        res.status(500).json({ error: 'Failed to track visit' });
    }
};
