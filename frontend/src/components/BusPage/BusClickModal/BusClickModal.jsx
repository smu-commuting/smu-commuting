/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './BusClickModal.scss';
import bus7016 from '../../../assets/BusPage/7016.png';
import bus08 from '../../../assets/BusPage/서대문08.png';
import cancel from '../../../assets/BusPage/cancel.png';
import { busModalClick } from '../../../modules/reducers/user';

function BusModal() {
    const dispatch = useDispatch();
    const onCancelClick = useCallback(() => {
        dispatch(busModalClick());
    }, [dispatch]);
    return (
        <div className="busmodal-wrapper">
            <div className="busmodal">
                <img
                    src={cancel}
                    className="cancel"
                    alt="cancel"
                    aria-hidden="true"
                    onClick={onCancelClick}
                />
                <div style={{ clear: 'both' }} />
                <div className="inner-wrapper">
                    <p>탑승할 버스를 선택해 주세요.</p>
                    <div className="bus-wrapper">
                        <div className="7016">
                            <img src={bus7016} alt="7016" />
                        </div>
                        <div className="08">
                            <img src={bus08} alt="08" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusModal;
