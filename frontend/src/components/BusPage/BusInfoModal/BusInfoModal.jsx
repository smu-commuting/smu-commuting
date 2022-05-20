import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { isBusInfoModalClick } from '../../../modules/reducers/bus';
import './BusInfoModal.scss';

function BusInfoModal() {
    const dispatch = useDispatch();
    const onModalClick = useCallback(() => {
        dispatch(isBusInfoModalClick());
    }, [dispatch]);
    return (
        <div
            className="businfomodal-wrapper"
            onClick={onModalClick}
            aria-hidden
        >
            BusInfoModal
        </div>
    );
}

export default BusInfoModal;
