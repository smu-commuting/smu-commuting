/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { taxiModalClick } from '../../modules/reducers/user';
import './TaxiPage.scss';
import taxi from '../../assets/TaxiPage/taxi.png';
import option from '../../assets/TaxiPage/option.png';
import alert from '../../assets/TaxiPage/option-alert.png';

function TaxiPage() {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { placeId, date, placeName } = useParams();
    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    useEffect(() => {
        const temp = date.split('-');
        setMonth(temp[1]);
        setDay(temp[2]);
    }, []);
    const onConditionChange = useCallback(() => {
        dispatch(taxiModalClick());
    }, [dispatch]);
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
                <div className="taxi-party-wrapper" />
            </div>
        </div>
    );
}

export default TaxiPage;
