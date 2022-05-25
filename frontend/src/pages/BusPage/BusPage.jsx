import React, { useCallback } from 'react';
import './BusPage.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import bus7016 from '../../assets/BusPage/7016.png';
import bus08 from '../../assets/BusPage/서대문08.png';
import refresh from '../../assets/BusPage/refresh.png';
import { busModalClick } from '../../modules/reducers/user';
import Bus7016 from '../../components/BusPage/Bus7016/Bus7016';
import Bus08 from '../../components/BusPage/Bus08/Bus08';

function BusPage() {
    const { busNum } = useParams();
    const dispatch = useDispatch();
    const onBusClick = useCallback(() => {
        dispatch(busModalClick());
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
                    <img src={refresh} alt="refresh" />
                </div>
            </div>
            {busNum === '7016' ? <Bus7016 /> : <Bus08 />}
            <button type="button" className="gototaxi">
                택시합승구하기
            </button>
        </div>
    );
}

export default BusPage;
