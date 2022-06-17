/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { API_URLS } from '../constants';

const { API_BUS } = API_URLS;

export const busApi = data => {
    console.log(
        'api 도착',
        `https://cors-anywhere.herokuapp.com/
        ${process.env.REACT_APP_BUS_URL}${API_BUS}arrive/getArrInfoByRouteAll?serviceKey=${process.env.REACT_APP_BUS_OPEN_DATA_KEY}&busRouteId=${data}&resultType=json`,
    );
    return axios.get(
        `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_BUS_URL}${API_BUS}arrive/getArrInfoByRouteAll?serviceKey=${process.env.REACT_APP_BUS_OPEN_DATA_KEY}&busRouteId=${data}&resultType=json`,
    );
};
