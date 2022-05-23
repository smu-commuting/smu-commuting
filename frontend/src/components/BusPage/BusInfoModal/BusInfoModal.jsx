/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isBusInfoModalClick } from '../../../modules/reducers/bus';
import './BusInfoModal.scss';
import Cancel from '../../../assets/BusPage/cancel.png';

function BusInfoModal() {
    const { isUserClickStationNumber, busData } = useSelector(
        state => state.bus,
    );
    const dispatch = useDispatch();
    const [cumCongest, setCumCongest] = useState();
    const onModalClick = useCallback(() => {
        dispatch(isBusInfoModalClick());
    }, [dispatch]);

    useEffect(() => {
        let target = 0;
        for (let i = 0; i < isUserClickStationNumber; i++) {
            if (
                busData[i].reride_Num1 === '5' &&
                busData[i].plainNo1 ===
                    busData[isUserClickStationNumber].plainNo1
            ) {
                target = i;
                break;
            }
        }
        if (target === 0) {
            switch (busData[isUserClickStationNumber].reride_Num1) {
                case '0':
                    setCumCongest('데이터 없음');
                    break;
                case '3':
                    setCumCongest(`현재 '여유' 상태에요 :)`);
                    break;
                case '4':
                    setCumCongest(`현재 '보통' 상태에요!`);
                    break;
                default:
                    break;
            }
        } else {
            const congest =
                parseInt(isUserClickStationNumber, 10) - parseInt(target, 10);
            setCumCongest(`${congest} 이전부터 혼잡`);
        }
    }, []);
    return (
        <div
            className="businfomodal-wrapper"
            onClick={onModalClick}
            aria-hidden
        >
            <div className="cancel">
                <img src={Cancel} alt="cancel" />
            </div>
            <div className="station">
                {busData[isUserClickStationNumber].stNm}
            </div>
            <div className="arr-info">
                <p>{busData[isUserClickStationNumber].plainNo1}번이 올거에요</p>
                <p>{busData[isUserClickStationNumber].arrmsg1}</p>
                <p>
                    {parseInt(busData[isUserClickStationNumber].goal1, 10) /
                        120}{' '}
                    초 후 학교 도착
                </p>
                <p>{cumCongest}</p>
            </div>
        </div>
    );
}

export default BusInfoModal;
