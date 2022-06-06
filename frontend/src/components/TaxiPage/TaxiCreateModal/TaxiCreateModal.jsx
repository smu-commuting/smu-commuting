import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { taxiCreateModalClick } from '../../../modules/reducers/taxi';
import './TaxiCreateModal.scss';
import cancel from '../../../assets/TaxiPage/cancel.png';

function TaxiCreateModal() {
    const dispatch = useDispatch();
    const onCancelClick = useCallback(() => {
        dispatch(taxiCreateModalClick());
    }, [dispatch]);
    return (
        <div className="taxicreatemodal-wrapper">
            <div className="taxicreatemodal">
                <img
                    src={cancel}
                    className="cancel"
                    alt="cancel"
                    aria-hidden="true"
                    onClick={onCancelClick}
                />
            </div>
        </div>
    );
}

export default TaxiCreateModal;
