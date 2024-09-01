import React from 'react';
import GoogleImg from '../../../../assets/images/google.svg'; // Убедитесь, что путь к изображению правильный

const GoogleLoginButton: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/auth-google/google';
    };

    return (
        <button
            onClick={handleGoogleLogin}
            style={{ width: '50%', padding: '12px', borderRadius: '8px' }}
            className="w-1/2 bg-gray-200 py-3 rounded-xl flex items-center justify-center hover:bg-gray-300 transition mr-2"
        >
            <img src={GoogleImg} alt="Google" className="w-6 h-6" /> {/* Удалили текст, оставили только изображение */}
        </button>
    );
};

export default GoogleLoginButton;
