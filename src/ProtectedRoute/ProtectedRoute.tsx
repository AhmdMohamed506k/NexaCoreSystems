
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const LocalToken = localStorage.getItem("token");
    const LocalUser = localStorage.getItem("user");

  
    if (!LocalToken && !LocalUser) {
        return <Navigate to="/SignIn" replace />;
    }

    return <>{children}</>;
}