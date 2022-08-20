/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isBusInfoModalClick } from '../../../modules/reducers/bus';
import './BusInfoModal.scss';
import Cancel from '../../../assets/BusPage/cancel.png';
import frontBus from '../../../assets/BusPage/front-bus.png';
import { busCongestSelector } from '../../../constants/busCongestSelector';

function BusInfoModal() {
    const { isUserClickStationNumber, busData } = useSelector(
        state => state.bus,
    );
    const dispatch = useDispatch();
    const onModalClick = useCallback(() => {
        dispatch(isBusInfoModalClick());
    }, [dispatch]);

    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);

    return (
        <div className="businfomodal-wrapper">
            <div className="cancel" onClick={onModalClick} aria-hidden>
                <img src={Cancel} alt="cancel" />
            </div>
            <div className="station">
                {busData[isUserClickStationNumber].stNm &&
                    busData[isUserClickStationNumber].stNm}
            </div>
            <main className="info-wrapper">
                <div className="info-bus">
                    <div className="img-wrapper">
                        <img src={frontBus} alt="첫번째 도착 버스" />
                        <p>
                            {busData &&
                                busData[isUserClickStationNumber].plainNo1}
                        </p>
                    </div>
                    {busData[isUserClickStationNumber].arrmsg1 ===
                    '운행종료' ? (
                        <p className="end">운행종료</p>
                    ) : (
                        <div className="info">
                            <p>
                                {busData &&
                                    busData[isUserClickStationNumber].arrmsg1}
                            </p>
                            <p>
                                {busData &&
                                    busCongestSelector(
                                        busData[isUserClickStationNumber]
                                            .reride_Num1,
                                    )}
                            </p>
                        </div>
                    )}
                </div>
                <div className="info-bus second">
                    <div className="img-wrapper">
                        <img src={frontBus} alt="두번째 도착 버스" />
                        <p>
                            {busData &&
                                busData[isUserClickStationNumber].plainNo2}
                        </p>
                    </div>
                    <div className="info">
                        <p>
                            {busData &&
                                busData[isUserClickStationNumber].arrmsg2}
                        </p>
                        <p>
                            {busData &&
                                busCongestSelector(
                                    busData[isUserClickStationNumber]
                                        .reride_Num2,
                                )}
                        </p>
                    </div>
                </div>
            </main>
            {/* {busData[isUserClickStationNumber].arrmsg1 === '운행종료' ? (
                <p className="end">운행종료</p>
            ) : (
                <div className="arr-info">
                    <p>
                        {busData && busData[isUserClickStationNumber].plainNo1}
                        번이 올거에요
                    </p>
                    <br />
                    <p>
                        {busData && busData[isUserClickStationNumber].arrmsg1}
                    </p>
                    <br />
                    <p>
                        {busData &&
                            busCongestSelector(
                                busData[isUserClickStationNumber].reride_Num1,
                            )}
                    </p>
                </div>
            )} */}
        </div>
    );
}

export default BusInfoModal;
