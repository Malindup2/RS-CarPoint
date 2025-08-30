import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    if (requireAdmin && !isAdmin()) {
      console.log('Not admin, redirecting to home');
      navigate('/');
      return;
    }
  }, [navigate, requireAdmin]);

  // If not authenticated or not admin when required, don't render anything
  if (!isAuthenticated() || (requireAdmin && !isAdmin())) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
