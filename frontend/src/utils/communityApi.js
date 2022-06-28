/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import { withAuthInstance } from './common';

export const postLostItem = async data => {
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}/api/post`,
        data,
    );
};
