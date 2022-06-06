/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import './BusPage.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import bus7016 from '../../assets/BusPage/7016.png';
import bus08 from '../../assets/BusPage/서대문08.png';
import refresh from '../../assets/BusPage/refresh.png';
import { busModalClick, taxiModalClick } from '../../modules/reducers/user';
import Bus7016 from '../../components/BusPage/Bus7016/Bus7016';
import Bus08 from '../../components/BusPage/Bus08/Bus08';
import Timer from '../../components/common/Timer';

function BusPage() {
    const { busNum } = useParams();
    const dispatch = useDispatch();
    const onBusClick = useCallback(() => {
        dispatch(busModalClick());
    }, [dispatch]);
    const onRefreshPage = useCallback(() => {
        window.location.reload();
    }, []);
    const onTaxiClick = useCallback(() => {
        dispatch(taxiModalClick());
    }, [dispatch]);

    return (
        <div className="buspage-wrapper">
            <div className="bus-logo-box">
                <div />
                <div>
                    <img
                        src={busNum === '7016' ? bus7016 : bus08}
                        alt="buslogo"
                        onClick={onBusClick}
                        aria-hidden
                    />
                </div>
                <div>
                    {/* <Timer mm={0} ss={15} /> */}
                    <img
                        src={refresh}
                        alt="refresh"
                        onClick={onRefreshPage}
                        aria-hidden
                    />
                </div>
            </div>
            {busNum === '7016' ? <Bus7016 /> : <Bus08 />}
            <button type="button" className="gototaxi" onClick={onTaxiClick}>
                택시합승구하기
            </button>
        </div>
    );
}

export default BusPage;
