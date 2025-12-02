import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isLocked, setIsLocked] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminPasscode] = useState('1234'); // Default admin passcode

    useEffect(() => {
        // Check if user has an active session
        const session = localStorage.getItem('portfolio_session');
        if (session) {
            const { isAdmin: savedIsAdmin, timestamp } = JSON.parse(session);
            // Session expires after 24 hours
            const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;

            if (!isExpired) {
                setIsLocked(false);
                setIsAdmin(savedIsAdmin);
            } else {
                localStorage.removeItem('portfolio_session');
            }
        }
    }, []);

    const unlock = (passcode) => {
        const isAdminCode = passcode === adminPasscode;

        setIsLocked(false);
        setIsAdmin(isAdminCode);

        // Save session
        localStorage.setItem('portfolio_session', JSON.stringify({
            isAdmin: isAdminCode,
            timestamp: Date.now()
        }));

        return isAdminCode;
    };

    const lock = () => {
        setIsLocked(true);
        setIsAdmin(false);
        localStorage.removeItem('portfolio_session');
    };

    return (
        <AuthContext.Provider value={{ isLocked, isAdmin, unlock, lock }}>
            {children}
        </AuthContext.Provider>
    );
};
