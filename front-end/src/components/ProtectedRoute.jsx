import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect to login but save the current location so user can return after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
