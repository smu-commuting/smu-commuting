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

// 게시물 단건 조회
export const getDetailInfoApi = async id => {
    console.log('해당 id 를 조회합니다.', id);
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}/api/post/${id}`,
    );
};

// 게시물 삭제
export const deleteDetailInfoApi = async id => {
    console.log('해당 id 를 삭제합니다.', id);
    return await withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/post/${id}`,
    );
};
