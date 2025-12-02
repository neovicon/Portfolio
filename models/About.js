import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    avatar: {
        type: String,
        default: '👨‍💻'
    }
}, {
    timestamps: true
});

const About = mongoose.model('About', aboutSchema);

export default About;
