import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    poster: String, // URL to image
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: '📁'
    },
    files: [fileSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Folder', folderSchema);
