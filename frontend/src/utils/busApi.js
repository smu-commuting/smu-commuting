/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import { API_URLS } from '../constants';
import { withAuthInstance } from './common';

const { API_BUS } = API_URLS;

export const busApi = async data => {
    console.log(`${process.env.REACT_APP_API_URL}${API_BUS}${data}`);
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}${API_BUS}${data}`,
    );
};
