import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.ts";
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../assets/animations/logoLoading.json';

interface PrivateRouteProps {
    element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Player
                    autoplay
                    loop
                    src={loadingAnimation}
                    style={{ height: '200px', width: '200px' }}
                />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default PrivateRoute;
