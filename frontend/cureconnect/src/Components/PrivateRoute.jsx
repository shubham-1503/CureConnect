import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ role }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return (
      userInfo && userInfo.token && userInfo.role === role ? <Outlet /> : (userInfo && userInfo.role !== role) ? <Navigate to="*" /> : <Navigate to="/user/Login" replace={true} />
  );
};

export default PrivateRoute;
