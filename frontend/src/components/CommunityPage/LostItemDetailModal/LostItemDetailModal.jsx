/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
    const { id } = useParams();
    const { lostItemInfo } = useSelector(state => state.community);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onDeleteConfirmModal = useCallback(() => {
        dispatch(isClickDetailUpdateDeleteModal());
        dispatch(deleteConfirmModal());
    }, [dispatch]);
    const onEditPage = useCallback(() => {
        dispatch(isClickDetailUpdateDeleteModal());
        navigate(`/lostitemedit/${id}`);
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
                <p onClick={prevent(() => onEditPage())} aria-hidden>
                    <img src={update} alt="수정" />
                    게시글 수정하기
                </p>
                <p onClick={prevent(() => onDeleteConfirmModal())} aria-hidden>
                    <img src={Delete} alt="삭제" />
                    게시글 삭제하기
                </p>
            </div>
        </div>
    );
}

export default LostItemDetailModal;
