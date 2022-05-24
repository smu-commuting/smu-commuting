/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_CHAT } = API_URLS;

export const getChattingApi = () => {
    return withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_CHAT}rooms`,
    );
};

export const deleteChatRoomApi = id => {
    console.log(`${process.env.REACT_APP_API_URL}${API_CHAT}room/${id}`);
    return withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}${API_CHAT}room/${id}`,
    );
};
