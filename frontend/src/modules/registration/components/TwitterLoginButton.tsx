import React from 'react';
import TwitterImg from '../../../assets/images/twitter_x.svg';

const TwitterLoginButton: React.FC = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/auth/twitter';
    };

    return (
        <button
            onClick={handleLogin}
            style={{ width: '50%', padding: '12px', borderRadius: '8px' }}
            className="w-full bg-almost-black text-white py-3 rounded-xl flex items-center justify-center hover:bg-gray-700 transition"
        >
            <img src={TwitterImg} alt="Twitter X" className="w-6 h-6 mr-2" />
        </button>
    );
};

export default TwitterLoginButton;
