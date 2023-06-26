import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(AuthContext);

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
