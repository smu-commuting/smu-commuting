import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taxiErrorModalClose } from '../../../modules/reducers/taxi';
import './TaxiNotCreateModal.scss';
import cannotenter from '../../../assets/TaxiPage/택시입장실패.MP3';

function TaxiNotCreateModal() {
    const dispatch = useDispatch();
    const { createTaxiPartyError } = useSelector(state => state.taxi);
    const onModalClose = useCallback(() => {
        dispatch(taxiErrorModalClose());
    }, [dispatch]);
    useEffect(() => {
        const audio = new Audio(cannotenter);
        audio.play();
    }, []);
    return (
        <div className="taxinotentermodal-wrapper">
            <div className="taxinotentermodal">
                <div className="error-text">
                    <p>{createTaxiPartyError}</p>
                </div>
                <button type="submit" onClick={onModalClose}>
                    확인
                </button>
            </div>
        </div>
    );
}

export default TaxiNotCreateModal;
