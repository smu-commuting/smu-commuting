/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { API_URLS } from '../constants';

const { API_BUS } = API_URLS;

export const busApi = data => {
    console.log('api 도착', data);
    return axios.get(
        `${API_BUS}arrive/getArrInfoByRouteAll?serviceKey=${process.env.REACT_APP_BUS_OPEN_DATA_KEY}&busRouteId=${data}&resultType=json`,
    );
};
