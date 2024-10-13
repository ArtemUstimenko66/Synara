import GoogleButton from 'react-google-button';

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'https://synara.help/api/auth-google/google';
    };

    return (
        <GoogleButton
            onClick={handleGoogleLogin}
        />
    );
};

export default GoogleLoginButton;
