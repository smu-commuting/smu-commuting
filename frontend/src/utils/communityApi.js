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

// 게시글 수정
export const editDetailInfoApi = async data => {
    console.log('해당 id 를 수정합니다.', data.id, data.formData);
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}/api/post/9`,
        data.formData,
    );
    // return await withAuthInstance.post(
    //     `${process.env.REACT_APP_API_URL}/api/post/${data.id}`,
    //     data.formData,
    // );
};

// 댓글 생성
export const postReplyApi = async dataObject => {
    console.log(
        '해당 게시글에 댓글을 생성하겠습니다.',
        dataObject.id,
        dataObject.data,
    );
    const data = {
        content: dataObject.data,
    };
    return await withAuthInstance.post(
        `${process.env.REACT_APP_API_URL}/api/post/9/reply`,
        data,
    );
    // return await withAuthInstance.post(
    //     `${process.env.REACT_APP_API_URL}/api/post/${dataObject.id}/reply`,
    //     data,
    // );
};

// 댓글 리스트 조회
export const getReplyListApi = async id => {
    console.log(`${id}번째 게시물의 댓글을 조회합니다.`);
    return await withAuthInstance.get(
        `${process.env.REACT_APP_API_URL}/api/post/9/replies`,
    );
};
