import React from 'react';
import GoogleButton from 'react-google-button';

const GoogleLoginButton = () => {

    const handleGoogleLogin = () => {
        // Your logic to handle Google Login, e.g., redirecting to your NestJS server
        window.location.href = 'http://localhost:8080/auth-google/google';
    };

    return (
        <GoogleButton
            onClick={handleGoogleLogin}
        />
    );
};

export default GoogleLoginButton;
