/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteConfirmModal,
    deleteLostItemDetailInfo,
    isClickDetailUpdateDeleteModal,
} from '../../../modules/reducers/community';
import './LostItemDetailModal.scss';
import update from '../../../assets/LostItemDetailModal/update.png';
import Delete from '../../../assets/LostItemDetailModal/delete.png';
import { prevent } from '../../../constants';

function LostItemDetailModal() {
    const { lostItemInfo } = useSelector(state => state.community);
    const dispatch = useDispatch();
    const onDeleteConfirmModal = useCallback(() => {
        dispatch(deleteConfirmModal());
    }, [dispatch]);
    const onPostModalClick = useCallback(() => {
        dispatch(isClickDetailUpdateDeleteModal());
    }, [dispatch]);
    return (
        <div
            className="lostitemdetailmodal-wrapper"
            role="button"
            onClick={onPostModalClick}
            aria-hidden
        >
            <div className="lostitemdetail-modal">
                <p>
                    <img src={update} alt="수정" />
                    수정하기
                </p>
                <p onClick={prevent(() => onDeleteConfirmModal())} aria-hidden>
                    <img src={Delete} alt="삭제" />
                    삭제하기
                </p>
            </div>
        </div>
    );
}

export default LostItemDetailModal;
