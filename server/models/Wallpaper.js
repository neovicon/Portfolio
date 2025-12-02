import mongoose from 'mongoose';

const wallpaperSchema = new mongoose.Schema({
    wallpaperId: {
        type: String,
        required: [true, 'Wallpaper ID is required'],
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Wallpaper = mongoose.model('Wallpaper', wallpaperSchema);

export default Wallpaper;
