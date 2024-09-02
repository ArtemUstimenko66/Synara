import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/auth/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PhoneVerificationPage from "./pages/PhoneVerificationPage.tsx";
import NewPasswordPage from "./pages/reset-password/NewPasswordPage.tsx";
import ResetPasswordPage from "./pages/reset-password/ResetPasswordPage.tsx";
import MainPage from "./pages/MainPage.tsx";

const App: React.FC = () => {
    return (
        <Router>
                <Routes>
                    {/*<Route path="/" element={<Navigate to="/home" replace />} />*/}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegisterPage />} />
                    {/*<Route path="/verify-phone" element={<PhoneVerificationPage />} />*/}
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/new-password" element={<NewPasswordPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
        </Router>
    );
};

export default App;
