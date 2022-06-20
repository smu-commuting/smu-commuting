/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginRequest } from '../../modules/reducers/user';
import LoadingPage from '../LoadingPage/LoadingPage';

function LogInProcess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, accessToken, studentId } = useParams();
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = accessToken;
        if (studentId === 'null') {
            navigate('/signup');
        } else {
            const userInfo = {
                email: `${studentId}@sangmyung.kr`,
                studentId,
                id,
            };
            dispatch(loginRequest(userInfo));
            navigate('/home');
        }
    }, []);
    return <LoadingPage />;
}

export default LogInProcess;
