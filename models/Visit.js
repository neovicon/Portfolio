import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
    ip: String,
    path: String,
    userAgent: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Visit = mongoose.model('Visit', VisitSchema);

export default Visit;
