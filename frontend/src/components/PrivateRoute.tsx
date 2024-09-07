import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.ts";


interface PrivateRouteProps {
    element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default PrivateRoute;
