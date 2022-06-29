import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { isClickDetailUpdateDeleteModal } from '../../../modules/reducers/community';
import './LostItemDetailModal.scss';

function LostItemDetailModal() {
    const dispatch = useDispatch();
    const onPostModalClick = useCallback(() => {
        dispatch(isClickDetailUpdateDeleteModal());
    }, [dispatch]);
    return (
        <div className="lostitemdetailmodal-wrapper">
            <p>게시글 수정</p>
            <div />
            <p>게시글 삭제</p>
            <div />
            <p onClick={onPostModalClick} aria-hidden>
                닫기
            </p>
        </div>
    );
}

export default LostItemDetailModal;
