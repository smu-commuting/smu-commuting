/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_BLOCK } = API_URLS;

export const blockUserApi = async id => {
    const data = {
        blockUserId: id,
    };
    console.log(`${process.env.REACT_APP_API_URL}${API_BLOCK}user`, data);
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}${API_BLOCK}user`,
        data,
    );
};
export const unBlockUserApi = async id => {
    console.log(`${process.env.REACT_APP_API_URL}${API_BLOCK}user/${id}`);
    return await withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}${API_BLOCK}user/${id}`,
    );
};
