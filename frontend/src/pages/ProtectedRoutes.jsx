/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';

function useAuth() {
    const user = { loggedIn: axios.defaults.headers.common['Authorization'] };
    if (!user.loggedIn) alert('로그인이 필요한 서비스입니다.');
    return user && user.loggedIn;
}

function ProtectedRoutes() {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
