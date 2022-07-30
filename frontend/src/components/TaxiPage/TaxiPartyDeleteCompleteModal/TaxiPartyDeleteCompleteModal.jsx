/* eslint-disable no-return-assign */
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taxiSecondModalClose } from '../../../modules/reducers/taxi';
import './TaxiPartyDeleteCompleteModal.scss';

function TaxiPartyDeleteCompleteModal() {
    const dispatch = useDispatch();
    const { chatRoomHeaderInfo } = useSelector(state => state.chat);
    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);
    const onModalClose = useCallback(() => {
        dispatch(taxiSecondModalClose());
    }, [dispatch]);
    return (
        <div className="taxipartydeletecompletemodal-wrapper">
            <div className="taxipartydeletecompletemodal">
                <div className="main-text">
                    <p>
                        {chatRoomHeaderInfo.place}
                        &nbsp;
                        {chatRoomHeaderInfo.time}
                        &nbsp;
                    </p>
                    <p>채팅방에서 나가기 되었습니다.</p>
                </div>
                <button type="submit" onClick={onModalClose}>
                    확인
                </button>
            </div>
        </div>
    );
}

export default TaxiPartyDeleteCompleteModal;
