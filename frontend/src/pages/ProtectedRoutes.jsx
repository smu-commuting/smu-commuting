/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function useAuth() {
    const user = { loggedIn: localStorage.getItem('loggedIn') };
    if (user.loggedIn === 'false') alert('로그인이 필요한 서비스입니다.');
    return user && user.loggedIn;
}

function ProtectedRoutes() {
    const isAuth = useAuth();
    return isAuth !== 'false' ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
