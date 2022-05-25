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
        // console.log(accessToken);
        axios.defaults.headers.common['Authorization'] = accessToken;
        // console.log(axios.defaults.headers.common['Authorization']);
        if (studentId === 'null') {
            setTimeout(() => {
                navigate('/signup');
            }, 1500);
        } else {
            const userInfo = {
                email: `${studentId}@sangmyung.kr`,
                studentId,
            };
            dispatch(loginRequest(userInfo));
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        }
    }, []);
    return <LoadingPage />;
}

export default LogInProcess;
