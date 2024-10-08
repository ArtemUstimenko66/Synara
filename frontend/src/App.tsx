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
import PetitionPage from "./pages/petitions/PetitionPage.tsx";
import CreatePetitionPage from "./pages/petitions/CreatePetitionPage.tsx";
import PetitionDetailsPage from "./pages/petitions/PetitionDetailsPage.tsx";
import AboutPage from "./pages/about-us/AboutPage.tsx";
import VolunteerProfilePage from "./pages/profile/VolunteerProfilePage.tsx";
import HowItWorksPage from "./pages/how-it-works/HowItWorksPage.tsx";
import CookiePolicyPage from "./pages/cookie-policy/CookiePolicyPage.tsx";
import MapsAlarm from "./pages/maps/MapsAlarm.tsx";
import Maps from "./pages/maps/Maps.tsx";

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
            <Route path="/profile-volunteer/:id" element={<PrivateRoute element={<VolunteerProfilePage />} />} />

            {/* main */}
            <Route path="/main" element={<PrivateRoute element={<WebSocketProvider><MainPage /></WebSocketProvider>} />} />
            <Route path="/add-announcement" element={<PrivateRoute element={<CreateAnnouncementPage />} />} />
            <Route path="/main/announcement/:id" element={<PrivateRoute element={<WebSocketProvider><AnnouncementDetailsPage /></WebSocketProvider>} />} />

            {/* chat */}
            <Route path="/chat" element={<PrivateRoute element={<WebSocketProvider> <FullChat /> </WebSocketProvider>} />} />
            <Route path="/chat/:chatId" element={<PrivateRoute element={<WebSocketProvider> <FullChat /> </WebSocketProvider>} />} />

            {/* maps */}
            <Route path="/map-alert" element={<MapsAlarm />} />
            <Route path="/map-help" element={<Maps />} />

            {/* gatherings */}
            <Route path="/gatherings" element={<GatheringPage />} />
            <Route path="/add-gathering" element={<PrivateRoute element={<CreateGatheringPage />} />} />
            <Route path="/gathering/:id" element={<GatheringDetailsPage />} />

            {/* petitions */}
            <Route path="/petitions" element={<PrivateRoute element={<PetitionPage />} />} />
            <Route path="/add-petition" element={<PrivateRoute element={<CreatePetitionPage />} />} />
            <Route path="/petition/:id" element={<PrivateRoute element={<PetitionDetailsPage />} />} />

            {/* question */}
            <Route path="/faq" element={<FAQPage />} />

            {/* how it works */}
            <Route path="/how-it-works" element={<HowItWorksPage />} />

            {/* cookie policy */}
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />

            {/* about */}
            <Route path="/about" element={<AboutPage />} />

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
