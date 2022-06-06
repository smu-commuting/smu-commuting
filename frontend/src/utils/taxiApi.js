/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_TAXI } = API_URLS;

// 채팅 목록 조회 API
export const getMyTaxiPartiesApi = async () => {
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_TAXI}my-parties`,
    );
};

// 채팅 목록 삭제 API
export const deleteTaxiPartyApi = async id => {
    return await withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}${API_TAXI}room/${id}`,
    );
};