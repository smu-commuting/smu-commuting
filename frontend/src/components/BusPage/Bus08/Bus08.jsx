import React, { useCallback, useEffect } from 'react';
import './Bus08.scss';
import { useDispatch, useSelector } from 'react-redux';
import BusRight from '../../../assets/BusPage/bus-right.png';
import BusLeft from '../../../assets/BusPage/bus-left.png';
import Search from '../../../assets/BusPage/search.png';
import {
    isBusInfoFetch,
    isBusInfoModalClick,
} from '../../../modules/reducers/bus';
import BusInfoModal from '../BusInfoModal/BusInfoModal';

function Bus08() {
    const dispatch = useDispatch();
    const { isBusInfoModalOpen } = useSelector(state => state.bus);
    const onBusInfoClick = useCallback(
        value => {
            dispatch(isBusInfoModalClick(value));
        },
        [dispatch],
    );
    useEffect(() => {
        dispatch(isBusInfoFetch('100900012'));
    }, []);
    return (
        <div className="bus08-wrapper">
            {isBusInfoModalOpen && <BusInfoModal />}
            <div className="first-bus-line">
                <div
                    className="bus-img-wrapper"
                    onClick={() => onBusInfoClick(parseInt(12, 10))}
                    aria-hidden
                >
                    <img src={BusLeft} alt="유진상가" />
                </div>
                <div
                    className="bus-img-wrapper"
                    onClick={() => onBusInfoClick(parseInt(10, 10))}
                    aria-hidden
                >
                    <img src={BusLeft} alt="홍제역" />
                </div>
            </div>
            <div className="second-area-line">
                <p>유진상가</p>
                <p>홍제역</p>
            </div>
            <div className="third-bus-line">
                <div
                    className="bus-img-wrapper"
                    onClick={() => onBusInfoClick(parseInt(15, 10))}
                    aria-hidden
                >
                    <img src={BusRight} alt="간호대" />
                </div>
                <p>
                    현재 위치를 <br />
                    클릭해 보세요!
                </p>
            </div>
            <div className="fourth-area-line">
                <p>서울여자간호대학교</p>
                <img className="search" src={Search} alt="간호대" />
            </div>
        </div>
    );
}

export default Bus08;
