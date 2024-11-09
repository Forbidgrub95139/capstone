// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/AuthProvider';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Optionally, show a loading spinner while authentication status is being checked
    return <div>Loading...</div>;
  }

  // If no user is logged in, redirect to the home or login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If a user is logged in, render the children components (protected page)
  return children;
};

export default ProtectedRoute;
