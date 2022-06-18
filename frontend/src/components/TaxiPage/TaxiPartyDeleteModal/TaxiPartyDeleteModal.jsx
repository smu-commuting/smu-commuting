/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteModal, deleteTaxiParty } from '../../../modules/reducers/taxi';
import './TaxiPartyDeleteModal.scss';

function TaxiPartyDeleteModal() {
    const dispatch = useDispatch();
    const { deleteInfo } = useSelector(state => state.taxi);

    const onCancelClick = useCallback(() => {
        dispatch(deleteModal());
    }, [dispatch]);

    const onAgreeClick = useCallback(() => {
        dispatch(deleteTaxiParty(deleteInfo.chatRoomId));
    }, [dispatch]);

    return (
        <div className="taxipartydeletemodal-wrapper">
            <div className="taxipartydeletemodal">
                <p>
                    {deleteInfo && deleteInfo.date} &nbsp;
                    {deleteInfo && deleteInfo.place}&nbsp;
                    {deleteInfo && deleteInfo.time}&nbsp; (
                    {deleteInfo.headcount}/{deleteInfo.maximum}) <br />
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
