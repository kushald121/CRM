import { createContext, useContext, useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session on backend
        const checkSession = async () => {
            try {
                const data = await fetchData('/auth/me');
                if (data.isAuthenticated) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error('Session check failed', err);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await fetchData('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (data.success) {
                setUser(data.user);
                return { success: true, user: data.user };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await fetchData('/auth/logout', { method: 'POST' });
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
