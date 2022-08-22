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
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}/api/post/${parseInt(id, 10)}`,
    );
};

// 게시물 삭제
export const deleteDetailInfoApi = async id => {
    return await withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/post/${id}`,
    );
};

// 게시글 수정
export const editDetailInfoApi = async data => {
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}/api/post/${data.id}`,
        data.formData,
    );
};

// 댓글 생성
export const postReplyApi = async dataObject => {
    const data = {
        content: dataObject.data,
    };
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}/api/post/${dataObject.id}/reply`,
        data,
    );
};

// 댓글 리스트 조회
export const getReplyListApi = async id => {
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}/api/post/${id}/replies`,
    );
};

// 댓글 삭제
export const deleteReplyApi = async id => {
    return await withAuthInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/post/reply/${id}`,
    );
};

// 댓글 수정
export const editReplyApi = async dataObject => {
    const data = {
        content: dataObject.content,
    };
    return await withAuthInstance.put(
        `${process.env.REACT_APP_API_URL}/api/post/reply/${dataObject.id}`,
        data,
    );
};
