/* eslint-disable no-return-assign */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getReplyList,
    replyDeleteConfirmModal,
    replyModalClick,
} from '../../../modules/reducers/community';
import { deleteReplyApi } from '../../../utils/communityApi';
import './ReplyDeleteConfirmModal.scss';

function ReplyDeleteConfirmModal() {
    const { id } = useParams();
    const { clickReplyContent } = useSelector(state => state.community);
    const dispatch = useDispatch();
    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);
    const onCancelClick = useCallback(() => {
        dispatch(replyDeleteConfirmModal());
    }, []);
    const onAgreeClick = useCallback(() => {
        deleteReplyApi(clickReplyContent.id)
            .then(() => {
                dispatch(replyModalClick());
                dispatch(replyDeleteConfirmModal());
                dispatch(getReplyList(id));
            })
            .catch(e => console.log(e));
    }, []);
    return (
        <div className="replydeleteconfirmmodal-wrapper">
            <div className="replydeleteconfirm-modal">
                <p>해당 댓글을 삭제하시겠습니까?</p>
                <div className="button-wrapper">
                    <div className="cancel" onClick={onCancelClick} aria-hidden>
                        <p>취소</p>
                    </div>
                    <div className="agree" onClick={onAgreeClick} aria-hidden>
                        <p>확인</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyDeleteConfirmModal;
