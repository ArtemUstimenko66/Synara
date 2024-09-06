import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from "./pages/auth/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import NewPasswordPage from "./pages/reset-password/NewPasswordPage.tsx";
import ResetPasswordPage from "./pages/reset-password/ResetPasswordPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import CreateAnnouncementPage from "./modules/main-page/components/CreateAnnouncementPage.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            {/* home */}
            <Route path="/home" element={<HomePage />} />

            {/* auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />

            {/* profile */}
            <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />

            {/* main */}
            <Route path="/main" element={<PrivateRoute element={<MainPage />} />} />
            <Route path="/add-announcement" element={<PrivateRoute element={<CreateAnnouncementPage />} />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
