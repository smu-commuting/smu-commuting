/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { isBusInfoModalClick } from '../../../modules/reducers/bus';
import './BusInfoModal.scss';
import Cancel from '../../../assets/BusPage/cancel.png';

function BusInfoModal({ station }) {
    const { isBusInfoModalOpen } = useSelector(state => state.bus);
    const dispatch = useDispatch();
    const [arrTime, setArrTime] = useState();
    const onModalClick = useCallback(() => {
        dispatch(isBusInfoModalClick());
    }, [dispatch]);
    useEffect(() => {
        axios
            .get(
                `/api/rest/arrive/getArrInfoByRouteAll?serviceKey=${process.env.REACT_APP_BUS_OPEN_DATA_KEY}&busRouteId=100100447&resultType=json`,
            )
            .then(res => {
                console.log(res.data.msgBody.itemList);
            });
    }, []);
    return (
        <div
            className="businfomodal-wrapper"
            onClick={onModalClick}
            aria-hidden
        >
            <div className="cancel">
                <img src={Cancel} alt="cancel" />
                <div style={{ clear: 'both' }} />
            </div>
            <div className="station">{arrTime}</div>
        </div>
    );
}

export default BusInfoModal;
