import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    const userEmail = localStorage.getItem('userEmail');

    if (!isAdmin || userEmail !== 'amzad.nnt@gmail.com') {
      navigate('/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthGuard;
