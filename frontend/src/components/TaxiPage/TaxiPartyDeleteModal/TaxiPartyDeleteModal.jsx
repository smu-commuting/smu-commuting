/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteModal, deleteTaxiParty } from '../../../modules/reducers/taxi';
import './TaxiPartyDeleteModal.scss';

function TaxiPartyDeleteModal() {
    const dispatch = useDispatch();
    const { chatRoomHeaderInfo } = useSelector(state => state.chat);
    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);
    const onCancelClick = useCallback(() => {
        dispatch(deleteModal());
    }, [dispatch]);

    const onAgreeClick = useCallback(() => {
        dispatch(deleteTaxiParty(chatRoomHeaderInfo.taxiPartyId));
    }, [dispatch]);

    return (
        <div className="taxipartydeletemodal-wrapper">
            <div className="taxipartydeletemodal">
                <p>
                    {chatRoomHeaderInfo && chatRoomHeaderInfo.place}
                    &nbsp;
                    {chatRoomHeaderInfo && chatRoomHeaderInfo.time}
                    <br />
                    채팅방을 나가시겠습니까?
                </p>
                <p>대화 내용이 삭제되며 채팅목록에서 삭제됩니다.</p>
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

export default TaxiPartyDeleteModal;
