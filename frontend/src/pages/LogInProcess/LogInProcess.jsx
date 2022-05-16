/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LogInProcess.scss';
import sumungLoading from '../../assets/LogInProcess/수뭉이-뱃지2.png';
import { loginRequest } from '../../modules/reducers/user';

function LogInProcess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, accessToken, studentId } = useParams();
    useEffect(() => {
        localStorage.setItem('accessToken', accessToken);
        if (studentId === 'null') {
            setTimeout(() => {
                navigate('/signup');
            }, 1500);
        } else {
            const userInfo = {
                id: parseInt(id, 10),
                email: `${studentId}@sangmyung.kr`,
                studentId,
            };
            dispatch(loginRequest(userInfo));
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        }
    }, []);
    return (
        <div className="loginprocess-wrapper">
            <img src={sumungLoading} alt="loading" />
        </div>
    );
}

export default LogInProcess;
