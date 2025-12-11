import React from 'react';
import AppIcon from '../ui/AppIcon';

const DesktopIcons = ({ apps, onAppClick }) => {
    return (
        <div className="desktop-icons" style={{
            position: 'absolute',
            top: '40px', // Below menu bar
            left: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 100px)',
            gridAutoRows: '120px',
            gap: '10px',
            height: 'calc(100vh - 140px)', // Minus menu bar and dock
            width: '100%',
            pointerEvents: 'none', // Allow clicks to pass through to wallpaper if needed, but children need events
            zIndex: 1
        }}>
            {apps.map(app => (
                <div key={app.id} style={{ pointerEvents: 'auto' }}>
                    <AppIcon
                        type={app.id}
                        label={app.name}
                        onClick={() => onAppClick(app.id)}
                        icon={app.icon} // Pass custom icon if available
                    />
                </div>
            ))}
        </div>
    );
};

export default DesktopIcons;
