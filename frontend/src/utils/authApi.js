/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_USER } = API_URLS;

// 인증번호 요청 API
export const sendNumberApi = async studentId => {
    const data = {
        email: studentId,
    };
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}${API_USER}email`,
        data,
    );
};

// 인증번호 검증 API
export const verificationNumApi = async authNum => {
    const data = {
        code: authNum,
    };
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}${API_USER}email/verification`,
        data,
    );
};

// saga 회원가입 API
export const signupApi = data => {
    console.log(data);
    return withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}${API_USER}signup`,
        data,
    );
};
