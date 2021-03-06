import React, { useCallback, useEffect } from 'react';
import './Bus7016.scss';
import { useDispatch, useSelector } from 'react-redux';
import BusRight from '../../../assets/BusPage/bus-right.png';
import BusLeft from '../../../assets/BusPage/bus-left.png';
import Search from '../../../assets/BusPage/search.png';
import BusInfoModal from '../BusInfoModal/BusInfoModal';
import {
    isBusInfoFetch,
    isBusInfoModalClick,
} from '../../../modules/reducers/bus';
import {
    Bus7016ID,
    CityHall,
    GyeongBok,
    KTGwangHwa,
    NamYoungStation,
    SeoulStation,
} from '../../../constants';

function Bus7016() {
    const dispatch = useDispatch();
    const { isBusInfoModalOpen } = useSelector(state => state.bus);
    const onBusInfoClick = useCallback(
        value => {
            dispatch(isBusInfoModalClick(value));
        },
        [dispatch],
    );
    useEffect(() => {
        dispatch(isBusInfoFetch(Bus7016ID));
    }, [dispatch]);
    return (
        <div className="bus7016-wrapper">
            {isBusInfoModalOpen && <BusInfoModal />}
            <div className="first-bus-line">
                <div
                    className="bus-img-wrapper"
                    onClick={() => onBusInfoClick(NamYoungStation)}
                    aria-hidden
                >
                    <img src={BusRight} alt="남영역" />
                </div>
                <div
                    className="bus-img-wrapper"
                    onClick={() => onBusInfoClick(SeoulStation)}
                    aria-hidden
                >
                    <img src={BusRight} alt="서울역" />
                </div>
            </div>
            <div className="second-area-line">
                <p>남영역</p>
                <p>서울역</p>
            </div>
            <div className="third-bus-line">
                <div
                    className="bus-img-wrapper"
                    onClick={() => onBusInfoClick(KTGwangHwa)}
                    aria-hidden
                >
                    <img src={BusLeft} alt="KT 광화문지사" />
                </div>
                <div
                    className="bus-img-wrapper"
                    onClick={() => onBusInfoClick(CityHall)}
                    aria-hidden
                >
                    <img src={BusLeft} alt="시청역" />
                </div>
            </div>
            <div className="fourth-area-line">
                <p>KT 광화문지사</p>
                <p>시청역</p>
            </div>
            <div className="fifth-bus-line">
                <div
                    className="bus-img-wrapper"
                    onClick={() => onBusInfoClick(GyeongBok)}
                    aria-hidden
                >
                    <img src={BusRight} alt="경복궁역" />
                </div>
                <p>
                    현재 위치를 <br />
                    클릭해 보세요!
                </p>
            </div>
            <div className="sixth-area-line">
                <p>경복궁역</p>
                <img className="search" src={Search} alt="" />
            </div>
        </div>
    );
}

export default Bus7016;
