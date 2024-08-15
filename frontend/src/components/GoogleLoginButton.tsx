import GoogleButton from 'react-google-button';

const GoogleLoginButton = () => {

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/auth-google/google';
    };

    return (
        <GoogleButton
            onClick={handleGoogleLogin}
        />
    );
};

export default GoogleLoginButton;
