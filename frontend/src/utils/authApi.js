/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_USER, API_PROFILES, API_BLOCK } = API_URLS;

export const fcmApi = async token => {
    const data = {
        fcmToken: token,
    };
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}${API_USER}fcm/token`,
        data,
    );
};

// 인증번호 요청 API
export const sendNumberApi = async (studentId, email) => {
    const data = {
        email: `${studentId}@${email}`,
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

// 회원가입 API -> saga
export const signupApi = async data => {
    return withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}${API_USER}signup`,
        data,
    );
};

// 탈퇴 API
export const deleteUserApi = () => {
    return withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}${API_USER}`,
    );
};

// 내 정보 조회 API
export const userInfoReadApi = () => {
    return withAuthInstance.get(`${process.env.REACT_APP_API_URL}${API_USER}`);
};

// 내 정보 수정 API
export const userInfoUpdateApi = async id => {
    const data = {
        imageId: id,
    };
    return withAuthInstance.put(
        `${process.env.REACT_APP_API_URL}${API_USER}`,
        data,
    );
};

// 프로필 이미지 리스트 조회 API
export const getProfileListApi = () => {
    return withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_PROFILES}`,
    );
};

// 차단 유저 list 조회 API
export const getBlockedUserApi = () => {
    return withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_BLOCK}users`,
    );
};
