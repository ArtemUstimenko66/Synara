import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from "./pages/auth/LoginPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.tsx";
import NewPasswordPage from "./pages/reset-password/NewPasswordPage.tsx";
import ResetPasswordPage from "./pages/reset-password/ResetPasswordPage.tsx";
import MainPage from "./pages/main-page/MainPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import CreateAnnouncementPage from "./pages/main-page/CreateAnnouncementPage.tsx";
import FullChat from "./modules/chat/components/FullChat.tsx";
import {WebSocketProvider} from "./hooks/WebSocketContext.tsx";
import GatheringPage from "./pages/gathering/GatheringPage.tsx";
import FAQPage from "./pages/faq/FAQPage.tsx";
import PrivacyPolicyPage from "./pages/privacy-policy/PrivacyPolicyPage.tsx";
import TermsOfUsePage from "./pages/terms-of-use/TermsOfUsePage.tsx";
import CreateGatheringPage from "./pages/gathering/CreateGatheringPage.tsx";
import GatheringDetailsPage from "./pages/gathering/GatheringDetailsPage.tsx";
import AnnouncementDetailsPage from "./pages/main-page/AnnouncementDetailsPage.tsx";

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
            <Route path="/main" element={<PrivateRoute element={<WebSocketProvider><MainPage /></WebSocketProvider>} />} />
            <Route path="/add-announcement" element={<PrivateRoute element={<CreateAnnouncementPage />} />} />
            <Route path="/main/announcement/:id" element={<PrivateRoute element={<WebSocketProvider><AnnouncementDetailsPage /></WebSocketProvider>} />} />

            {/* chat */}
            <Route path="/chat" element={<PrivateRoute element={<WebSocketProvider> <FullChat /> </WebSocketProvider>} />} />

            {/* gatherings */}
            <Route path="/gatherings" element={<GatheringPage />} />
            <Route path="/add-gathering" element={<PrivateRoute element={<CreateGatheringPage />} />} />
            <Route path="/gathering/:id" element={<GatheringDetailsPage />} />

            {/* question */}
            <Route path="/faq" element={<FAQPage />} />

            {/* privacy policy */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

            {/* terms of use */}
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />

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
