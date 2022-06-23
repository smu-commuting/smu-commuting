import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taxiSecondModalClose } from '../../../modules/reducers/taxi';
import './TaxiNotEnterModal.scss';
import cannotenter from '../../../assets/TaxiPage/택시입장실패.MP3';

function TaxiNotEnterModal() {
    const dispatch = useDispatch();
    const { isTaxiPartyEnterError } = useSelector(state => state.taxi);
    const onModalClose = useCallback(() => {
        dispatch(taxiSecondModalClose());
    }, [dispatch]);
    useEffect(() => {
        const audio = new Audio(cannotenter);
        audio.play();
    }, []);
    return (
        <div className="taxinotentermodal-wrapper">
            <div className="taxinotentermodal">
                <div className="error-text">
                    <p>{isTaxiPartyEnterError}</p>
                </div>
                <button type="submit" onClick={onModalClose}>
                    확인
                </button>
            </div>
        </div>
    );
}

export default TaxiNotEnterModal;
