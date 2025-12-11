import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    items: {
        type: [String],
        required: [true, 'Skills items are required'],
        default: []
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Skills = mongoose.model('Skills', skillsSchema);

export default Skills;
