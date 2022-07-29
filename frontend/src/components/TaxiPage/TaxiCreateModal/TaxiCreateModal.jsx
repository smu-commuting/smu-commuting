/* eslint-disable no-return-assign */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
    taxiCreateModalClick,
    taxiPartyCreate,
} from '../../../modules/reducers/taxi';
import './TaxiCreateModal.scss';
import cancel from '../../../assets/TaxiPage/cancel.png';
import { hoursArr, minutesArr } from '../../../constants';
import TimePick from '../TimePick/TimePick';

function TaxiCreateModal() {
    const { taxiPageInfo } = useSelector(state => state.taxi);
    const [selectedTime, setSelectedTime] = useState(null);
    const [ampm, setAmpm] = useState();
    const [hour, setHour] = useState(
        new Date().getHours() > 12
            ? new Date().getHours() - 12
            : new Date().getHours(),
    );
    const [minute, setMinute] = useState();
    const [headCount, setHeadCount] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);
    const onCancelClick = useCallback(() => {
        dispatch(taxiCreateModalClick());
    }, [dispatch]);
    useEffect(() => {
        const now = new Date();
        if (now.getHours() < 12) setAmpm('AM');
        else setAmpm('PM');
        setMinute(now.getMinutes());
    }, []);

    const onCreateTaxiParty = () => {
        const time = dayjs(selectedTime).format('HH:mm');
        console.log(time);
        // let tempHour;
        // if (ampm === 'PM') {
        //     tempHour = hour + 12;
        // } else if (ampm === 'AM') {
        //     if (hour === 12) tempHour = 0;
        //     else tempHour = hour;
        // }

        const when = `${taxiPageInfo.when}T${time}`;
        if (time === 'Invalid Date') {
            alert('탑승 시간을 선택해주세요.');
            return;
        }
        if (headCount === 0) {
            alert('인원수를 설정해주세요');
            return;
        }
        const data = {
            placeId: taxiPageInfo.placeId,
            headCount,
            meetingDate: when,
        };
        dispatch(taxiPartyCreate(data));
        dispatch(taxiCreateModalClick());
    };

    return (
        <div className="taxicreatemodal-wrapper">
            <div className="taxicreatemodal">
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
                        가장 먼저 택시 인원을 <br /> 모집해보세요!
                    </p>
                    <TimePick
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    />
                    {/* <div className="time-wrapper">
                        <div className="am-pm-wrapper">
                            <div className="center-align">
                                <p
                                    className={
                                        ampm === 'AM'
                                            ? 'active-ampm'
                                            : 'non-active-ampm'
                                    }
                                    onClick={() => setAmpm('AM')}
                                    aria-hidden
                                >
                                    오전
                                </p>
                                <p
                                    className={
                                        ampm === 'PM'
                                            ? 'active-ampm'
                                            : 'non-active-ampm'
                                    }
                                    onClick={() => setAmpm('PM')}
                                    aria-hidden
                                >
                                    오후
                                </p>
                            </div>
                        </div>
                        <div className="hour-wrapper">
                            <p>{hour}시</p>
                            <div className="hour-scroll">
                                {hoursArr.map(hours => {
                                    return hours === hour ? (
                                        <p className="active-hour">{hours}시</p>
                                    ) : (
                                        <p
                                            className="non-active-hour"
                                            onClick={() => setHour(hours)}
                                            aria-hidden
                                        >
                                            {hours}시
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="minute-wrapper">
                            <p>{minute}분</p>
                            <div className="minute-scroll">
                                {minutesArr.map(minutes => {
                                    return minutes === minute ? (
                                        <p className="active-minute">
                                            {minutes}분
                                        </p>
                                    ) : (
                                        <p
                                            className="non-active-minute"
                                            onClick={() => setMinute(minutes)}
                                            aria-hidden
                                        >
                                            {minutes}분
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div> */}
                    <div className="headcount-wrapper">
                        <div
                            className={
                                headCount === 2
                                    ? 'active-headcount'
                                    : 'non-active-headcount'
                            }
                            onClick={() => {
                                setHeadCount(2);
                            }}
                            aria-hidden
                        >
                            2명
                        </div>
                        <div
                            className={
                                headCount === 3
                                    ? 'active-headcount'
                                    : 'non-active-headcount'
                            }
                            onClick={() => {
                                setHeadCount(3);
                            }}
                            aria-hidden
                        >
                            3명
                        </div>
                        <div
                            className={
                                headCount === 4
                                    ? 'active-headcount'
                                    : 'non-active-headcount'
                            }
                            onClick={() => {
                                setHeadCount(4);
                            }}
                            aria-hidden
                        >
                            4명
                        </div>
                    </div>
                </div>
                <button
                    className="create"
                    type="submit"
                    onClick={onCreateTaxiParty}
                >
                    채팅방 생성하기
                </button>
            </div>
        </div>
    );
}

export default TaxiCreateModal;
