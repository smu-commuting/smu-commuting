/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_USER, API_PROFILES } = API_URLS;

// 인증번호 요청 API
export const sendNumberApi = async studentId => {
    const data = {
        email: `${studentId}@sangmyung.kr`,
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
export const signupApi = data => {
    return withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}${API_USER}signup`,
        data,
    );
};

// 탈퇴 API
export const deleteUserApi = () => {
    console.log(
        '탈퇴 API 연동 테스트',
        `${process.env.REACT_APP_API_URL}${API_USER}`,
    );
    return withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}${API_USER}`,
    );
};

// 내 정보 조회 API
export const userInfoReadApi = () => {
    console.log(
        '유저 정보 조회 API ',
        `${process.env.REACT_APP_API_URL}${API_USER}`,
    );
    return withAuthInstance.get(`${process.env.REACT_APP_API_URL}${API_USER}`);
};

// 내 정보 수정 API
export const userInfoUpdateApi = id => {
    console.log(
        '유저 정보 수정 API의 수정될 사진 id',
        id,
        `${process.env.REACT_APP_API_URL}${API_USER}`,
    );
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
