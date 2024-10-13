import React from 'react';
import GoogleImg from '../../../../assets/images/google.svg?react'; // Ensure the path to the image is correct

const GoogleLoginButton: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'https://synara.help/auth-google/google';
    };

    return (
        <button
            onClick={handleGoogleLogin}
            style={{ width: '50%', padding: '12px', borderRadius: '8px' }}
            className="w-1/2 bg-gray-200 py-3 rounded-xl flex items-center justify-center hover:bg-gray-300 transition mr-2"
        >
            <GoogleImg className="w-6 h-6" />
        </button>
    );
};

export default GoogleLoginButton;