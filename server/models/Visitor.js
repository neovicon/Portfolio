import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    ipHash: {
        type: String,
        required: true,
        unique: true
    },
    userAgent: {
        type: String,
        required: true
    },
    firstVisit: {
        type: Date,
        default: Date.now
    },
    lastVisit: {
        type: Date,
        default: Date.now
    },
    visits: {
        type: Number,
        default: 1
    }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
