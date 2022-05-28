/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_CHAT } = API_URLS;

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
