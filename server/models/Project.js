import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    technologies: {
        type: [String],
        default: []
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
