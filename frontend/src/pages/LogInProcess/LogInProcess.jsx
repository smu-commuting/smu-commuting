/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginRequest } from '../../modules/reducers/user';
import LoadingPage from '../LoadingPage/LoadingPage';

function LogInProcess() {
    const dispatch = useDispatch();
    const { id, accessToken, studentId } = useParams();
    useEffect(() => {
        console.log(accessToken);
        axios.defaults.headers.common['Authorization'] = accessToken;
        if (studentId !== 'null') {
            const userInfo = {
                email: `${studentId}@sangmyung.kr`,
                studentId,
                id,
            };
            dispatch(loginRequest(userInfo));
        }
    }, []);
    return (
        <>
            <LoadingPage />
            {studentId !== 'null' ? (
                <Navigate to="/home" />
            ) : (
                <Navigate to="/signup" />
            )}
        </>
    );
}

export default LogInProcess;
