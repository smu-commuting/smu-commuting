/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    taxiPartyEnter,
    taxiToChatModal,
} from '../../../modules/reducers/taxi';
import { withAuthInstance } from '../../../utils/common';
import { taxiPartyEnterApi } from '../../../utils/taxiApi';
import './TaxiToChatModal.scss';

function TaxiToChatModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        chattingRoomInfo,
        myTaxiParties,
        isTaxiPartyEnterLoading,
        isTaxiPartyEnterDone,
    } = useSelector(state => state.taxi);

    const onCancelClick = useCallback(() => {
        dispatch(taxiToChatModal());
    }, [dispatch]);

    const onAgreeClick = useCallback(async () => {
        const result = await taxiPartyEnterApi(chattingRoomInfo.taxiPartyId);
        dispatch(taxiPartyEnter());
        if (result.data.status === 200) {
            dispatch(taxiPartyEnter());
            navigate(`/chatroom/${chattingRoomInfo.taxiPartyId}`);
        } else {
            dispatch(taxiPartyEnter(result.response.data.error.info));
        }
    }, []);

    return (
        <div className="taxitochatmodal-wrapper">
            <div className="taxitochatmodal">
                <p>
                    {chattingRoomInfo && chattingRoomInfo.placeName}에서&nbsp;
                    {chattingRoomInfo && chattingRoomInfo.time}에 탑승하는
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
