/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DenialModal.scss';
import { useParams } from 'react-router-dom';
import cancel from '../../../assets/ChattingPage/cancel.png';
import denial from '../../../assets/ChattingPage/denial.png';
import {
    denialModalClick,
    getOutPeopleListRequest,
    getPeopleListRequest,
} from '../../../modules/reducers/chat';

function DenialModal() {
    const { id } = useParams();
    const { getPeopleList, getOutPeopleList } = useSelector(
        state => state.chat,
    );
    const [tabNumber, setTabNumber] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);

    useEffect(() => {
        dispatch(getPeopleListRequest(id));
        dispatch(getOutPeopleListRequest(id));
    }, [dispatch]);
    const denialModalClickHandler = useCallback(() => {
        dispatch(denialModalClick());
    }, [dispatch]);

    return (
        <div className="denialmodal-wrapper">
            <div className="denialmodal">
                <div className="denialmodal-header">
                    <img
                        src={cancel}
                        alt="취소"
                        onClick={denialModalClickHandler}
                        aria-hidden
                    />
                </div>
                <p className="title">다음 승차 거부 설정</p>
                <div className="tab-wrapper">
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                setTabNumber(0);
                            }}
                            className={tabNumber === 0 && 'active-tab'}
                        >
                            현재인원
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                setTabNumber(1);
                            }}
                            className={tabNumber === 1 && 'active-tab'}
                        >
                            나간인원
                        </button>
                    </div>
                </div>
                <ul className="content-wrapper">
                    {tabNumber === 0 ? (
                        getPeopleList.length === 0 ? (
                            <div className="no-data">
                                <img src={denial} alt="없음" />
                                <p>아직 들어온 슴우가 없어요😥</p>
                            </div>
                        ) : (
                            <>
                                {getPeopleList.map(people => (
                                    <li key={people.studentId}>
                                        <p>{people.studentId}</p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                console.log(people.userId)
                                            }
                                        >
                                            거부
                                        </button>
                                    </li>
                                ))}
                                <div className="notice-wrapper">
                                    <img src={denial} alt="스뭉" />
                                    <p className="notice-content">
                                        원하지 않는 탑승 메이트를 <br />
                                        설정해보세요!
                                    </p>
                                </div>
                            </>
                        )
                    ) : getOutPeopleList.length === 0 ? (
                        <div className="no-data">
                            <img src={denial} alt="없음" />
                            <p>아직 나간 슴우가 없어요😥</p>
                        </div>
                    ) : (
                        <>
                            {getOutPeopleList.map(people => (
                                <li key={people.studentId}>
                                    <p>{people.studentId}</p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            console.log(people.userId)
                                        }
                                    >
                                        거부
                                    </button>
                                </li>
                            ))}
                            <div className="notice-wrapper">
                                <img src={denial} alt="스뭉" />
                                <p className="notice-content">
                                    원하지 않는 탑승 메이트를 <br />
                                    설정해보세요!
                                </p>
                            </div>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default DenialModal;
