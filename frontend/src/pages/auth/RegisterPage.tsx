import React, { useState } from 'react';
import { register } from "../../services/authService.tsx";
import { sendVerificationCode } from "../../services/smsService.tsx";
import { Role } from '../../interfaces/AuthInterface.tsx';
import { useNavigate } from "react-router-dom";


const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<Role>(Role.Guest);
    const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register({ username, email, phoneNumber, password, role });
            await sendVerificationCode(phoneNumber);
            setIsVerificationSent(true);
            navigate('/verify-phone');
            console.log('Registration successful! Verification code sent to your phone.');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value={Role.Guest}>Guest</option>
                <option value={Role.Victim}>Victim</option>
                <option value={Role.Volunteer}>Volunteer</option>
            </select>
            <button
                onClick={handleRegister}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Register
            </button>

            {isVerificationSent && (
                <div className="mt-4 text-green-500">
                    <p>Please check your phone for the verification code.</p>
                </div>
            )}
        </div>
    );
};

export default Register;
