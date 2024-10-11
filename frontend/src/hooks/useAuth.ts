import { useEffect, useState } from 'react';
import {getProfile, getUser} from '../modules/profile/api/profileService';

export const useAuth = () => {
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
                //console.log(profile);
                setUserId(profile.id);
                setEmail(profile.email);
                const data = await getUser(profile.id);

                //console.log(" user -> ", data);
                setIsAuthenticated(true);

                if (profile.roles && profile.roles.length > 0) {
                    setRole(profile.roles[0]);
                } else {
                    setRole(null);
                }

                setUnp(data.UNP || null);
                setBirthDate(data.age || null);
            } catch (error) {
                console.log('Failed to fetch profile -> ', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { isAuthenticated, isLoading, userId, role, unp, birthDate, email };
};