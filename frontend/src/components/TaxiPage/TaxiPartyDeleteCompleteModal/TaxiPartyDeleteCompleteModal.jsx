import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taxiSecondModalClose } from '../../../modules/reducers/taxi';
import './TaxiPartyDeleteCompleteModal.scss';

function TaxiPartyDeleteCompleteModal() {
    const dispatch = useDispatch();
    const { deleteInfo } = useSelector(state => state.taxi);
    const onModalClose = useCallback(() => {
        dispatch(taxiSecondModalClose());
    }, [dispatch]);
    return (
        <div className="taxipartydeletecompletemodal-wrapper">
            <div className="taxipartydeletecompletemodal">
                <div className="main-text">
                    <p>
                        {deleteInfo.date} &nbsp; {deleteInfo.place} &nbsp;
                        {deleteInfo.time} &nbsp;
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
