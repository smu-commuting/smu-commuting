/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_CHAT, API_TAXI } = API_URLS;

export const getRoomMessage = async data => {
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_CHAT}room/${data.roomId}/messages`,
        {
            params: {
                size: data.size,
                lastMessageDate: data.date,
            },
        },
    );
};

// 택시 채팅방에 있는 유저 목록 조회
export const getPeopleListApi = async id => {
    console.log(id);
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_TAXI}party/${id}/users`,
    );
};
// 택시 채팅방에 나간 유저 목록 조회
export const getOutPeopleListApi = async id => {
    console.log(id);
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_TAXI}party/${id}/exit/users`,
    );
};
