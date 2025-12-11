import { useEffect, useState } from 'react';
import '../../styles/MacWindow.css';

const MacWindow = ({ app, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const AppComponent = app.component;

    return (
        <div className={`window-overlay ${isVisible ? 'visible' : ''}`}>
            <div className={`mac-window glass ${isVisible ? 'visible' : ''} ${isMaximized ? 'maximized' : ''}`}>
                <div className="window-titlebar">
                    <div className="window-controls">
                        <button
                            className="window-control close"
                            onClick={handleClose}
                            aria-label="Close"
                        />
                        <button className="window-control minimize" aria-label="Minimize" />
                        <button
                            className="window-control maximize"
                            onClick={toggleMaximize}
                            aria-label="Maximize"
                        />
                    </div>
                    <div className="window-title">{app.name}</div>
                    <div className="window-controls-spacer" />
                </div>
                <div className="window-content">
                    <AppComponent {...app.props} />
                </div>
            </div>
        </div>
    );
};

export default MacWindow;
