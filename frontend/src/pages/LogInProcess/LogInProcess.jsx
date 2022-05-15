/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LogInProcess.scss';
import sumungLoading from '../../assets/LogInProcess/수뭉이-뱃지2.png';

function LogInProcess() {
    const navigate = useNavigate();
    const { id, accessToken, studentId } = useParams();
    useEffect(() => {
        localStorage.setItem('accessToken', accessToken);
        if (studentId === 'null') {
            setTimeout(() => {
                navigate('/signup');
            }, 1500);
        } else {
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
