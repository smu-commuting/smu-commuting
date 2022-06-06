/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { taxiModalClick } from '../../modules/reducers/user';
import cancel from '../../assets/TaxiPage/cancel.png';
import './TaxiClickModal.scss';
import downtoggle from '../../assets/TaxiPage/downtoggle.png';
import { monthDay } from '../../constants';

function TaxiClickModal() {
    const [yearLists, setYearLists] = useState([]);
    const [year, setYear] = useState();
    const [month, setMonth] = useState();
    const [date, setDate] = useState();
    useEffect(() => {
        const now = new Date();
        setYear(now.getFullYear());
        setMonth(now.getMonth() + 1);
        setDate(now.getDate());
        setYearLists([
            now.getFullYear() - 1,
            now.getFullYear(),
            now.getFullYear() + 1,
        ]);
    }, []);
    const dispatch = useDispatch();
    const onCancelClick = useCallback(() => {
        dispatch(taxiModalClick());
    }, [dispatch]);

    return (
        <div className="taxiclickmodal-wrapper">
            <div className="taximodal">
                <img
                    src={cancel}
                    className="cancel"
                    alt="cancel"
                    aria-hidden="true"
                    onClick={onCancelClick}
                />
                <div style={{ clear: 'both' }} />
                <div className="inner-wrapper">
                    <p className="modal-text">
                        택시 탑승 날짜와 장소를 <br /> 선택해주세요!
                    </p>
                    <div className="date-wrapper">
                        <div className="year-box">
                            <p className="box-name">{year}년</p>
                            <div className="year-scroll">
                                {yearLists &&
                                    yearLists.map(yearList => {
                                        return year === yearList ? (
                                            <p
                                                className="click-year"
                                                key={yearList}
                                            >
                                                {yearList}년
                                            </p>
                                        ) : (
                                            <p
                                                className="non-click-year"
                                                key={yearList}
                                                onClick={() => {
                                                    setYear(yearList);
                                                    window.scrollTo({
                                                        top: yearList.offsetTop,
                                                        behavior: 'smooth',
                                                    });
                                                }}
                                                aria-hidden
                                            >
                                                {yearList}년
                                            </p>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="month-box">
                            <p className="box-name">{month}월</p>
                            <div className="month-scroll">
                                {month &&
                                    Object.keys(monthDay).map(mon => {
                                        return month === parseInt(mon, 10) ? (
                                            <p
                                                className="click-mon"
                                                key={mon}
                                                aria-hidden
                                            >
                                                {mon}월
                                            </p>
                                        ) : (
                                            <p
                                                className="non-click-mon"
                                                onClick={() => {
                                                    setMonth(parseInt(mon, 10));
                                                    setDate(
                                                        new Date().getDate(),
                                                    );
                                                }}
                                                aria-hidden
                                                key={mon}
                                            >
                                                {mon}월
                                            </p>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="day-box">
                            <p className="box-name">{date}일</p>
                            <div className="day-scroll">
                                {month &&
                                    monthDay[month].map(day => {
                                        return date === parseInt(day, 10) ? (
                                            <p className="click-day" key={day}>
                                                {day}일
                                            </p>
                                        ) : (
                                            <p
                                                className="non-click-day"
                                                onClick={() =>
                                                    setDate(parseInt(day, 10))
                                                }
                                                aria-hidden
                                                key={day}
                                            >
                                                {day}일
                                            </p>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaxiClickModal;
