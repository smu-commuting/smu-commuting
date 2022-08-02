/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    taxiPartyEnter,
    taxiToChatModalClose,
} from '../../../modules/reducers/taxi';
import { taxiPartyEnterApi } from '../../../utils/taxiApi';
import './TaxiToChatModal.scss';

function TaxiToChatModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { chattingRoomInfo } = useSelector(state => state.taxi);

    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);
    const onCancelClick = useCallback(() => {
        dispatch(taxiToChatModalClose());
    }, [dispatch]);

    const onAgreeClick = useCallback(async () => {
        taxiPartyEnterApi(chattingRoomInfo.taxiPartyId)
            .then(res => {
                navigate(`/chatroom/${chattingRoomInfo.taxiPartyId}`);
                dispatch(taxiPartyEnter()); // 모달 닫기용
            })
            .catch(err => {
                dispatch(taxiPartyEnter(err.response.data.error.info));
            });
    }, []);

    return (
        <div className="taxitochatmodal-wrapper">
            <div className="taxitochatmodal">
                <p>
                    {chattingRoomInfo && chattingRoomInfo.place}에서&nbsp;
                    {chattingRoomInfo && chattingRoomInfo.time}에 탑승하는
                    <br />
                    모임에 입장하시겠습니까?
                </p>
                {chattingRoomInfo.hasBlockedUser && (
                    <p className="warning">
                        [⚠주의] 이 채팅방은 이전에 탑승거부를 <br />
                        설정한 이용자가 참여 중입니다.
                    </p>
                )}
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

export default TaxiToChatModal;
