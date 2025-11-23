import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	// If not authenticated, redirect to login
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	// Otherwise render the protected children
	return children;
}

export default ProtectedRoute;