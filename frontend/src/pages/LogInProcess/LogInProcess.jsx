/* eslint-disable no-restricted-globals */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginRequest } from '../../modules/reducers/user';
import LoadingPage from '../LoadingPage/LoadingPage';
import { fcmApi } from '../../utils';

function LogInProcess() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, accessToken, studentId } = useParams();
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = accessToken;
        fcmApi(localStorage.getItem('FBToken'))
            .then(() => {})
            .catch(err => {});
        if (studentId !== 'null') {
            const userInfo = {
                studentId,
                id,
            };
            localStorage.setItem('loggedIn', true);
            dispatch(loginRequest(userInfo));
            navigate('/home');
        } else {
            navigate('/signup');
        }
    }, []);
    return <LoadingPage />;
}

export default LogInProcess;
