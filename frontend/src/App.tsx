import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from "./pages/auth/LoginPage.tsx";
import Profile from "./pages/Profile.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PhoneVerificationPage from "./pages/PhoneVerificationPage.tsx";
import NewPassword from "./pages/reset-password/NewPassword.tsx";
import ResetPassword from "./pages/reset-password/ResetPassword.tsx";

const App: React.FC = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegisterPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/verify-phone" element={<PhoneVerificationPage />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/new-password" element={<NewPassword />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
        </Router>
    );
};

export default App;
