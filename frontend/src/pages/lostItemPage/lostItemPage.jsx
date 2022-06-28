/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import add from '../../assets/InquiryPage/addcopy.png';
import Lost from '../../assets/LostItemPage/lost.png';
import './lostItemPage.scss';
import {
    deleteLostItemList,
    getLostItemList,
} from '../../modules/reducers/community';

const lostItemPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [itemBottle, setItemBottle] = useState([]);
    const { lostItemList, lostItemEnd, lostItemListLoading } = useSelector(
        state => state.community,
    );
    const homePage = () => {
        navigate(`/home`);
    };

    const lostItemWrite = () => {
        navigate(`/lostitemwrite`);
    };

    const goLostDetailPage = () => {
        navigate(`/lostitemdetail/7`);
    };

    useEffect(() => {
        dispatch(
            getLostItemList({
                page,
                size: 10,
            }),
        );
        return () => {
            dispatch(deleteLostItemList());
        };
    }, [dispatch]);

    useEffect(() => {
        setItemBottle(prev => [...prev, ...lostItemList]);
    }, [lostItemList]);

    useEffect(() => {
        dispatch(
            getLostItemList({
                page,
                size: 10,
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
                if (!lostItemEnd && !lostItemListLoading) {
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
    }, [window.screenY, lostItemEnd, lostItemListLoading]);

    return (
        <div className="lostitempage-wrapper">
            <div className="lostitempage-header">
                <div className="arrow-wrapper">
                    <img
                        src={Arrow}
                        alt="화살표"
                        onClick={homePage}
                        aria-hidden="true"
                    />
                </div>
                <div className="title">분실물</div>
                <div />
            </div>
            {/* <LostItemSearch /> */}
            <div className="lost-icon-wrapper">
                <img className="lost-icon" src={Lost} alt="분실물 로고" />
            </div>
            <ul className="lostitempage-content">
                <li>
                    <div className="picture">사진</div>
                    <div className="date">날짜</div>
                    <div className="item">물품</div>
                    <div className="place">장소</div>
                </li>
                {itemBottle.length === 0 ? (
                    <p>아직 데이터가 없습니다.</p>
                ) : (
                    itemBottle.map((lostItem, idx) => {
                        return (
                            <li
                                key={idx}
                                onClick={goLostDetailPage}
                                aria-hidden
                            >
                                <div className="picture">
                                    {lostItem.image ? (
                                        <img
                                            src={
                                                lostItem.image && lostItem.image
                                            }
                                            alt="분실물"
                                        />
                                    ) : (
                                        <div className="non-picture">
                                            (사진)
                                        </div>
                                    )}
                                </div>
                                <div className="date">
                                    {lostItem.createdDate &&
                                        lostItem.createdDate}
                                </div>
                                <div className="item">
                                    {lostItem.item && lostItem.item}
                                </div>
                                <div className="place">
                                    {lostItem.place && lostItem.place}
                                </div>
                            </li>
                        );
                    })
                )}
            </ul>

            <img
                className="add"
                src={add}
                alt="add"
                onClick={lostItemWrite}
                aria-hidden
            />
        </div>
    );
};

export default lostItemPage;
