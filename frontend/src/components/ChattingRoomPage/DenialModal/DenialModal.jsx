/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DenialModal.scss';
import { useParams } from 'react-router-dom';
import cancel from '../../../assets/ChattingPage/cancel.png';
import {
    denialModalClick,
    getOutPeopleListRequest,
    getPeopleListRequest,
} from '../../../modules/reducers/chat';

function DenialModal() {
    const { id } = useParams();
    const { getPeopleList, getOutPeopleList } = useSelector(
        state => state.chat,
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPeopleListRequest(id));
        dispatch(getOutPeopleListRequest(id));
    }, [dispatch]);
    const denialModalClickHandler = useCallback(() => {
        dispatch(denialModalClick());
    }, [dispatch]);
    return (
        <div className="denialmodal-wrapper">
            <div className="denialmodal">
                <div className="denialmodal-header">
                    <img
                        src={cancel}
                        alt="취소"
                        onClick={denialModalClickHandler}
                        aria-hidden
                    />
                </div>
                <p className="title">다음 승차 거부 설정</p>
            </div>
        </div>
    );
}

export default DenialModal;
