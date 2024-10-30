import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProfile, getUser } from '../modules/profile/api/profileService';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    userId: number | null;
    role: string | null;
    unp: string | null;
    birthDate: string | null;
    email: string | null;
    loginContext: () => Promise<void>;
    logoutContext: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<number | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [unp, setUnp] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                setUserId(profile.id);
                setEmail(profile.email);
                const data = await getUser(profile.id);

                setIsAuthenticated(true);

                if (profile.roles && profile.roles.length > 0) {
                    setRole(profile.roles[0]);
                } else {
                    setRole(null);
                }

                setUnp(data.UNP || null);
                setBirthDate(data.age || null);
            } catch (error) {
               // console.log('Failed to fetch profile -> ', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const loginContext = async () => {
        setIsLoading(true);
        try {
            const profile = await getProfile();
            setUserId(profile.id);
            setEmail(profile.email);
            const data = await getUser(profile.id);

            setIsAuthenticated(true);
            setRole(profile.roles && profile.roles.length > 0 ? profile.roles[0] : null);
            setUnp(data.UNP || null);
            setBirthDate(data.age || null);
        } catch (error) {
            console.error('Login failed', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const logoutContext = () => {
        setIsAuthenticated(false);
        setUserId(null);
        setEmail(null);
        setRole(null);
        setUnp(null);
        setBirthDate(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, userId, role, unp, birthDate, email, loginContext, logoutContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
