/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { taxiModalClick } from '../../modules/reducers/user';
import './TaxiPage.scss';
import taxi from '../../assets/TaxiPage/taxi.png';
import option from '../../assets/TaxiPage/option.png';
import alert from '../../assets/TaxiPage/option-alert.png';
import nolist from '../../assets/TaxiPage/nolist.png';
import add from '../../assets/TaxiPage/add.png';
import {
    getTaxiPartyList,
    taxiCreateModalClick,
} from '../../modules/reducers/taxi';
import TaxiCard from '../../components/TaxiPage/TaxiCard/TaxiCard';

function TaxiPage() {
    const dispatch = useDispatch();
    const { placeId, date, placeName } = useParams();
    const {
        taxiPartyList,
        isTaxiCreateModalOpen,
        taxiPartyListLoading,
        taxiPartyEnd,
        taxiPartyListDone,
    } = useSelector(state => state.taxi);
    const [partyList, setPartyList] = useState([]);
    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPartyList([]);
        if (isTaxiCreateModalOpen) dispatch(taxiCreateModalClick());
        const temp = date.split('-');
        setMonth(temp[1]);
        setDay(temp[2]);
        dispatch(
            getTaxiPartyList({
                page: 1,
                size: 10,
                placeId,
                date,
            }),
        );
    }, [placeId, date, placeName]);

    useEffect(() => {
        setPartyList([...partyList, ...taxiPartyList]);
    }, [taxiPartyList]);
    const onConditionChange = useCallback(() => {
        dispatch(taxiModalClick());
    }, [dispatch]);
    const onCreateClick = useCallback(() => {
        dispatch(taxiCreateModalClick());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getTaxiPartyList({
                page: page + 1,
                size: 10,
                placeId,
                date,
            }),
        ); // 다 내리면 새로운거 로딩
    }, [page]);

    // 스크롤이 내려갈 때마다 데이터를 불러오는 로직
    useEffect(() => {
        function onScroll() {
            if (
                window.innerHeight + window.scrollY >
                document.body.offsetHeight - 10
            ) {
                if (!taxiPartyEnd && !taxiPartyListLoading) {
                    setPage(prev => prev + 1);
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [window.screenY, taxiPartyEnd, taxiPartyListDone]);

    return (
        <div className="taxipage-wrapper">
            <div className="taxi-logo-box">
                <img
                    src={taxi}
                    alt="taxi"
                    onClick={onConditionChange}
                    aria-hidden
                />
            </div>
            <div className="taxi-info-wrapper">
                <div className="taxi-place-box">
                    <div>
                        <p>
                            {month}월 {day}일 '{placeName}'
                        </p>
                        <p>택시 탑승 예정 시간</p>
                    </div>
                    <div>
                        <img src={alert} alt="말풍선" />
                        <img src={option} alt="스뭉이" />
                    </div>
                </div>
                <div className="taxi-party-list">
                    {partyList.length !== 0 ? (
                        partyList.map(party => {
                            return (
                                <TaxiCard
                                    taxiPartyId={party.taxiPartyId}
                                    headcount={party.headcount}
                                    maximum={party.maximum}
                                    time={party.time}
                                />
                            );
                        })
                    ) : (
                        <div className="none-data">
                            <img src={nolist} alt="데이터 없음" />
                            <p>가장 먼저 택시인원을 모집해보세요</p>
                        </div>
                    )}
                </div>
            </div>
            <img
                className="add"
                src={add}
                alt="add"
                onClick={onCreateClick}
                aria-hidden
            />
        </div>
    );
}

export default TaxiPage;
