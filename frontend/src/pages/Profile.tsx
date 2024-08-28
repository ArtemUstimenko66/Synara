import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {getProfile, logout} from "../modules/profile/api/registerService.ts";

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                setUser(profile);
            } catch (error) {
                setError('Failed to fetch profile');
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!user) return <div className="text-center mt-4">Loading...</div>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
                <p className="mb-4"><span className="font-semibold">Username:</span> {user.username}</p>
                <p className="mb-6"><span className="font-semibold">Email:</span> {user.email}</p>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
