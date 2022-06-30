/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    deleteConfirmModal,
    deleteLostItemDetailInfo,
    isClickDetailUpdateDeleteModal,
    replyModalClick,
} from '../../../modules/reducers/community';
import './ReplyUpdateDeleteModal.scss';
import update from '../../../assets/LostItemDetailModal/update.png';
import Delete from '../../../assets/LostItemDetailModal/delete.png';
import { prevent } from '../../../constants';
import { deleteReplyApi } from '../../../utils/communityApi';

function ReplyUpdateDeleteModal() {
    const { clickReplyContent } = useSelector(state => state.community);
    const dispatch = useDispatch();
    const onDeleteConfirmModal = useCallback(() => {
        deleteReplyApi(clickReplyContent.id)
            .then(res => {
                dispatch(replyModalClick());
            })
            .catch(e => console.log(e));
    }, [dispatch]);
    const onReplyModal = useCallback(() => {
        dispatch(replyModalClick());
    }, [dispatch]);
    return (
        <div
            className="replyupdatedeletemodal-wrapper"
            role="button"
            onClick={onReplyModal}
            aria-hidden
        >
            <div className="replyupdatedelete-modal">
                <p>
                    <img src={update} alt="수정" />
                    댓글 수정하기
                </p>
                <p onClick={prevent(() => onDeleteConfirmModal())} aria-hidden>
                    <img src={Delete} alt="삭제" />
                    댓글 삭제하기
                </p>
            </div>
        </div>
    );
}

export default ReplyUpdateDeleteModal;
