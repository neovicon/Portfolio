import { useEffect, useState } from 'react';
import '../../styles/iOSPanel.css';

const iOSPanel = ({ app, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger slide-up animation
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const AppComponent = app.component;

    return (
        <div className={`ios-panel-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
            <div
                className={`ios-panel ${isVisible ? 'visible' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="ios-panel-header">
                    <button className="ios-back-button" onClick={handleClose}>
                        <span className="ios-back-icon">‹</span>
                        <span>Back</span>
                    </button>
                    <h2 className="ios-panel-title">{app.name}</h2>
                    <div className="ios-header-spacer" />
                </div>
                <div className="ios-panel-content">
                    <AppComponent {...app.props} />
                </div>
            </div>
        </div>
    );
};

export default iOSPanel;
