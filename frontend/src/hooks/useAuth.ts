import { useEffect, useState } from 'react';
import { getProfile } from '../modules/profile/api/profileService';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                //console.log(profile);
                setUserId(profile.id);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to fetch profile -> ', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { isAuthenticated, isLoading, userId };
};
