/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_CHAT, API_TAXI } = API_URLS;

// 채팅 목록 조회 API
export const getChattingApi = async () => {
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_TAXI}my-parties`,
    );
};

// 채팅 목록 삭제 API
export const deleteChatRoomApi = async id => {
    return await withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}${API_CHAT}room/${id}`,
    );
};
