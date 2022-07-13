/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
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
    getMyTaxiParties,
    getTaxiPartyList,
    taxiCreateModalClick,
    taxiPartyListDelete,
    taxiPartyListRestart,
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
        createTaxiPartyDone,
        isDeleteAllowModal,
        isTaxiPartyEnterDone,
    } = useSelector(state => state.taxi);
    const [partyList, setPartyList] = useState([]);
    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [page, setPage] = useState(1);

    const onConditionChange = useCallback(() => {
        dispatch(taxiModalClick());
    }, [dispatch]);
    const onCreateClick = useCallback(() => {
        dispatch(taxiCreateModalClick());
    }, [dispatch]);

    useEffect(() => {
        setPartyList([]);
        setPage(1);
        dispatch(getMyTaxiParties()); // 택시 리스트 들어왔을 때, 내가 속해있는 채팅방 리스트 redux 관리
        dispatch(taxiPartyListRestart());
        if (isTaxiCreateModalOpen) dispatch(taxiCreateModalClick());
        dispatch(
            getTaxiPartyList({
                page,
                size: 10,
                placeId,
                date,
            }),
        );
        const temp = date.split('-');
        setMonth(temp[1]);
        setDay(temp[2]);
        return () => {
            dispatch(taxiPartyListDelete());
        };
    }, [
        dispatch,
        placeId,
        date,
        placeName,
        createTaxiPartyDone,
        isDeleteAllowModal,
        isTaxiPartyEnterDone,
    ]);

    useEffect(() => {
        setPartyList(prev => [...prev, ...taxiPartyList]);
    }, [taxiPartyList]);

    useEffect(() => {
        dispatch(
            getTaxiPartyList({
                page,
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
                    setPage(prev => {
                        return prev + 1;
                    });
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
                <div
                    className="taxi-place-box"
                    onClick={onConditionChange}
                    aria-hidden
                >
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
                        partyList.map((party, idx) => {
                            return (
                                <TaxiCard
                                    taxiPartyId={party.taxiPartyId}
                                    headcount={party.headcount}
                                    maximum={party.maximum}
                                    time={party.time}
                                    key={idx}
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
