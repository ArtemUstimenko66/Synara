// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from "./pages/auth/LoginPage.tsx";
import Profile from "./pages/Profile.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Wrapper from "./components/Wrapper.tsx";
import VerificationPage from "./pages/auth/VerificationPage.tsx";
const App: React.FC = () => {
    return (
        <Router>
            <Wrapper>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegisterPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/verify-phone" element={<VerificationPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

            </Wrapper>
        </Router>
    );
};

export default App;
