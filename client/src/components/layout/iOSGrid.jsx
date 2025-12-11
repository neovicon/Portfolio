import { useState } from 'react';
import AppIcon from '../ui/AppIcon';
import '../../styles/iOSGrid.css';

const iOSGrid = ({ apps, onAppClick, isDark, toggleTheme }) => {
    const [page, setPage] = useState(0);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        });
    };

    // Split apps into pages
    // Page 0: Default apps (about, projects, skills, contact) + Theme
    // Page 1: Custom apps + Admin Plus

    const defaultAppIds = ['about', 'projects', 'skills', 'contact'];
    const defaultApps = apps.filter(app => defaultAppIds.includes(app.id));
    const customApps = apps.filter(app => !defaultAppIds.includes(app.id));

    return (
        <div className="ios-container">
            {/* iOS Status Bar */}
            <div className="ios-statusbar">
                <span className="ios-time">{getCurrentTime()}</span>
                <div className="ios-notch"></div>
                <div className="ios-statusbar-right">
                    <svg className="ios-status-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 9v6h2V9H2zm4 0v6h2V9H6zm4 0v6h2V9h-2zm4 0v6h2V9h-2zm4-2v10h2V7h-2z" />
                    </svg>
                    <svg className="ios-status-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                    </svg>
                    <svg className="ios-status-icon battery" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                    </svg>
                </div>
            </div>

            {/* App Grid */}
            <div className="ios-grid" style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                width: '100%',
                height: '100%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: '20px 0'
            }}>
                {/* Page 0 */}
                <div style={{
                    minWidth: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridAutoRows: 'min-content',
                    gap: '20px',
                    padding: '0 20px',
                    scrollSnapAlign: 'start'
                }}>
                    {defaultApps.map(app => (
                        <AppIcon
                            key={app.id}
                            type={app.id}
                            label={app.name}
                            onClick={() => onAppClick(app.id)}
                            icon={app.icon}
                        />
                    ))}
                    <AppIcon
                        type="settings"
                        label="Theme"
                        onClick={toggleTheme}
                    />
                </div>

                {/* Page 1 (if there are custom apps) */}
                {(customApps.length > 0) && (
                    <div style={{
                        minWidth: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridAutoRows: 'min-content',
                        gap: '20px',
                        padding: '0 20px',
                        scrollSnapAlign: 'start'
                    }}>
                        {customApps.map(app => (
                            <AppIcon
                                key={app.id}
                                type={app.id}
                                label={app.name}
                                onClick={() => onAppClick(app.id)}
                                icon={app.icon}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Dots */}
            <div className="ios-pagination" style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px'
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'white',
                    opacity: 1
                }} />
                {customApps.length > 0 && (
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'white',
                        opacity: 0.5
                    }} />
                )}
            </div>

            {/* iOS Home Indicator */}
            <div className="ios-home-indicator" />
        </div>
    );
};

export default iOSGrid;
