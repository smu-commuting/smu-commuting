import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taxiSecondModalClose } from '../../../modules/reducers/taxi';
import './TaxiPartyDeleteCompleteModal.scss';

function TaxiPartyDeleteCompleteModal() {
    const dispatch = useDispatch();
    const { deleteInfo, chattingRoomInfo } = useSelector(state => state.taxi);
    const onModalClose = useCallback(() => {
        dispatch(taxiSecondModalClose());
    }, [dispatch]);
    return (
        <div className="taxipartydeletecompletemodal-wrapper">
            <div className="taxipartydeletecompletemodal">
                <div className="main-text">
                    <p>
                        {deleteInfo.place
                            ? deleteInfo.place
                            : chattingRoomInfo.placeName}
                        &nbsp;
                        {deleteInfo.time
                            ? deleteInfo.time
                            : chattingRoomInfo.time}
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
