/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    deleteConfirmModal,
    deleteLostItemDetailInfo,
    getReplyList,
    isClickDetailUpdateDeleteModal,
    replyDeleteConfirmModal,
    replyModalClick,
} from '../../../modules/reducers/community';
import './ReplyUpdateDeleteModal.scss';
import update from '../../../assets/LostItemDetailModal/update.png';
import Delete from '../../../assets/LostItemDetailModal/delete.png';
import { prevent } from '../../../constants';
import { editReplyApi } from '../../../utils/communityApi';

function ReplyUpdateDeleteModal() {
    const { id } = useParams();
    const { clickReplyContent } = useSelector(state => state.community);
    const [replyMode, setReplyMode] = useState(false);
    const dispatch = useDispatch();
    const [reply, setReply] = useState(clickReplyContent.data);
    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);
    const onReplyChange = e => {
        setReply(e.target.value);
    };

    const onReplyModal = useCallback(() => {
        dispatch(replyModalClick());
    }, [dispatch]);

    const onReplyMode = () => {
        setReplyMode(prev => !prev);
    };
    const onDeleteConfirmModal = useCallback(() => {
        dispatch(replyDeleteConfirmModal());
    }, [dispatch]);

    const onEditSubmit = useCallback(() => {
        const data = {
            id: clickReplyContent.id,
            content: reply,
        };
        editReplyApi(data)
            .then(res => {
                onReplyModal();
                dispatch(getReplyList(id));
            })
            .catch(err => {});
    }, [dispatch, id, reply]);

    return (
        <div
            className="replyupdatedeletemodal-wrapper"
            role="button"
            onClick={onReplyModal}
            aria-hidden
        >
            <div
                className="replyupdatedelete-modal"
                onClick={prevent(() => {})}
                aria-hidden
            >
                {replyMode ? (
                    <div className="edit-wrapper">
                        <textarea
                            className="edit-box"
                            value={reply}
                            onChange={onReplyChange}
                        />
                        <div className="bottom-wrapper">
                            <div className="left" />
                            <div className="right">
                                <button
                                    className="cancel-btn"
                                    type="button"
                                    onClick={onReplyMode}
                                >
                                    취소
                                </button>
                                <button
                                    className="edit-btn"
                                    type="submit"
                                    onClick={onEditSubmit}
                                >
                                    수정
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <p onClick={prevent(() => onReplyMode())} aria-hidden>
                            <img src={update} alt="수정" />
                            댓글 수정하기
                        </p>
                        <p
                            onClick={prevent(() => onDeleteConfirmModal())}
                            aria-hidden
                        >
                            <img src={Delete} alt="삭제" />
                            댓글 삭제하기
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default ReplyUpdateDeleteModal;
