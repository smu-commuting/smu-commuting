/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import { withAuthInstance } from './common';

export const postLostItemApi = async data => {
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}/api/post`,
        data,
    );
};

export const getLostItemListApi = async data => {
    console.log(data);
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        {
            params: {
                page: data.page,
                size: data.size,
            },
        },
    );
};
