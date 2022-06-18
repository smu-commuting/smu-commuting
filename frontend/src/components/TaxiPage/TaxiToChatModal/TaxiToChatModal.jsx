/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    taxiPartyEnter,
    taxiToChatModal,
} from '../../../modules/reducers/taxi';
import './TaxiToChatModal.scss';

function TaxiToChatModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        chattingRoomInfo,
        isTaxiPartyEnterDone,
        isTaxiPartyEnterLoading,
        taxiToChatRoom,
    } = useSelector(state => state.taxi);

    const toChatRoom = useCallback(() => {
        if (taxiToChatRoom) {
            navigate(`/chatroom/${chattingRoomInfo.taxiPartyId}`);
        }
    }, [taxiToChatRoom]);

    const onCancelClick = useCallback(() => {
        dispatch(taxiToChatModal());
    }, [dispatch]);

    const onAgreeClick = useCallback(() => {
        dispatch(taxiPartyEnter(chattingRoomInfo.taxiPartyId));
        toChatRoom();
    }, [dispatch]);

    return (
        <div className="taxitochatmodal-wrapper">
            <div className="taxitochatmodal">
                <p>
                    {chattingRoomInfo && chattingRoomInfo.placeName}에서&nbsp;
                    {chattingRoomInfo && chattingRoomInfo.time}에 탑승하는{' '}
                    <br />
                    모임에 입장하시겠습니까?
                </p>
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
