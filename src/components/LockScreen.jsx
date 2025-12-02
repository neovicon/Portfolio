import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/LockScreen.css';

const LockScreen = () => {
    const { unlock } = useAuth();
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handlePasscodeChange = (e) => {
        const value = e.target.value;
        if (value.length <= 6) {
            setPasscode(value);
            setError('');
        }
    };

    const handleUnlock = (e) => {
        e.preventDefault();

        if (!passcode) {
            setError('Please enter a passcode');
            return;
        }

        setIsUnlocking(true);

        setTimeout(() => {
            const isAdminMode = unlock(passcode);

            if (isAdminMode) {
                console.log('🔓 Unlocked as Admin');
            } else {
                console.log('👤 Unlocked as Guest');
            }
        }, 300);
    };

    const formatTime = () => {
        return currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = () => {
        return currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={`lock-screen ${isUnlocking ? 'unlocking' : ''}`}>
            <div className="lock-screen-content">
                <div className="lock-time">{formatTime()}</div>
                <div className="lock-date">{formatDate()}</div>

                <form onSubmit={handleUnlock} className="lock-form">
                    <div className="lock-instruction">
                        Enter passcode to unlock
                    </div>

                    <div className="passcode-container">
                        <input
                            type="text"
                            value={passcode}
                            onChange={handlePasscodeChange}
                            className="passcode-input-field"
                            placeholder="Enter passcode"
                            autoFocus
                            maxLength={6}
                        />
                        <div className="passcode-dots">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`passcode-dot ${i < passcode.length ? 'filled' : ''}`}
                                />
                            ))}
                        </div>
                    </div>

                    {error && <div className="lock-error">{error}</div>}

                    <button type="submit" className="unlock-button">
                        Unlock
                    </button>

                    <div className="lock-hint">
                        💡 Tip: Any code unlocks
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LockScreen;
