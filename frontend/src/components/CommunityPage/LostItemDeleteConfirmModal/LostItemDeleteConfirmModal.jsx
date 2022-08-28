/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    deleteConfirmModal,
    deleteLostItemDetailInfo,
} from '../../../modules/reducers/community';
import { deleteDetailInfoApi } from '../../../utils/communityApi';
import './LostItemDeleteConfirmModal.scss';

function LostItemDeleteConfirmModal() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onCancelClick = useCallback(() => {
        dispatch(deleteConfirmModal());
    }, [dispatch]);
    const onAgreeClick = useCallback(async () => {
        // 동적 id 받아서 이후에 다시 처리할 것
        deleteDetailInfoApi(id)
            .then(res => {
                dispatch(deleteConfirmModal());
                navigate(`/lostitem`);
            })
            .catch(err => {});
    }, []);
    return (
        <div className="lostitemdeleteconfirmmodal-wrapper">
            <div className="lostitemdeleteconfirm-modal">
                <p>주인을 찾아주셨나요?</p>
                <p>게시글을 삭제하시겠습니까?</p>
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

export default LostItemDeleteConfirmModal;
