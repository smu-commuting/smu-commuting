/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    taxiPartyEnter,
    taxiToChatModal,
} from '../../../modules/reducers/taxi';
import './TaxiToChatModal.scss';

function TaxiToChatModal() {
    const dispatch = useDispatch();
    const {
        chattingRoomInfo,
        isTaxiPartyEnterLoading,
        isTaxiPartyEnterDone,
        showErrorModal,
    } = useSelector(state => state.taxi);
    const onCancelClick = useCallback(() => {
        dispatch(taxiToChatModal());
    }, [dispatch]);
    const onAgreeClick = useCallback(() => {
        dispatch(taxiPartyEnter(chattingRoomInfo.taxiPartyId));
    }, [dispatch]);
    useEffect(() => {
        if (showErrorModal) {
            dispatch(taxiToChatModal());
            dispatch(showErrorModal());
        }
    }, [showErrorModal]);
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
