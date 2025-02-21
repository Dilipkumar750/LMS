import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppLayout } from '../layout/appLayout';

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <AppLayout />;
};

export { PrivateRoute };
