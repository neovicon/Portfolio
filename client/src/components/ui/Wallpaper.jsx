import { useState, useEffect } from 'react';
import '../../styles/Wallpaper.css';

const Wallpaper = ({ wallpaper = 'gradient-1' }) => {
    const [currentWallpaper, setCurrentWallpaper] = useState(wallpaper);

    useEffect(() => {
        setCurrentWallpaper(wallpaper);
    }, [wallpaper]);

    const getWallpaperUrl = () => {
        // Check if it's a custom uploaded image (starts with url())
        if (currentWallpaper.startsWith('url(')) {
            return currentWallpaper;
        }

        // Default wallpapers
        const wallpapers = {
            'gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'gradient-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'gradient-4': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'gradient-5': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'dark': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            'macos-light': 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
            'macos-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        };

        return wallpapers[currentWallpaper] || wallpapers['gradient-1'];
    };

    return (
        <div
            className="wallpaper"
            style={{
                background: getWallpaperUrl(),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        />
    );
};

export default Wallpaper;
