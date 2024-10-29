import { Navigate } from 'react-router-dom';
import {useAuth} from "./useAuth.ts";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../assets/animations/logoLoading.json";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { role, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Player
                    autoplay
                    loop
                    src={loadingAnimation}
                    style={{ height: '200px', width: '200px' }}
                />
            </div>
        );
    }

    if (!isAuthenticated || role !== requiredRole) {
        return <Navigate to="*" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
