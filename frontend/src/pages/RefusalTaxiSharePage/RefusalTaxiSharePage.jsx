/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import { getBlockedUserList } from '../../modules/reducers/user';
import { unBlockUserApi } from '../../utils/blockApi';
import './RefusalTaxiSharePage.scss';
import defaultImg from '../../assets/MyPage/block-default.png';

function RefusalTaxiSharePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blockedUserList } = useSelector(state => state.user);
    const myPage = () => {
        navigate(`/mypage`);
    };

    useEffect(() => {
        dispatch(getBlockedUserList());
    }, [dispatch]);

    const unBlockUserHandler = id => {
        console.log('거부', id);
        unBlockUserApi(id).then(() => {
            dispatch(getBlockedUserList());
        });
    };

    return (
        <div className="refusaltaxisharepage-wrapper">
            <div className="refusaltaxisharepage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={myPage}
                    aria-hidden="true"
                />
                <div>택시 합승 거부 설정</div>
            </div>
            {blockedUserList.length === 0 ? (
                <div className="no-list-wrapper">
                    <div>
                        <img src={defaultImg} alt="no-list" />
                        <p>합승 거부한 학우가 없습니다.</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="headcount-text">
                        총 {blockedUserList && blockedUserList.length}명의
                        학우를 탑승 거부하였습니다.
                    </div>
                    <ul className="refusaltaxisharepage-content">
                        {blockedUserList &&
                            blockedUserList.map(blockedUser => (
                                <li className="refusal-list">
                                    <p>{blockedUser.studentId}</p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            unBlockUserHandler(
                                                blockedUser.userId,
                                            )
                                        }
                                    >
                                        해제
                                    </button>
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default RefusalTaxiSharePage;
