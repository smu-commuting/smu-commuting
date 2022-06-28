/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import add from '../../assets/InquiryPage/addcopy.png';
import './lostItemPage.scss';
import LostItemSearch from '../../components/CommunityPage/LostItemSearch/LostItemSearch';
import { getLostItemList } from '../../modules/reducers/community';

const lostItemPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { lostItemList } = useSelector(state => state.community);
    const homePage = () => {
        navigate(`/home`);
    };

    const lostItemWrite = () => {
        navigate(`/lostitemwrite`);
    };

    useEffect(() => {
        dispatch(
            getLostItemList({
                page,
                size: 10,
            }),
        );
    }, [dispatch]);

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
            <ul className="lostitempage-content">
                <li>
                    <p className="picture">사진</p>
                    <p className="date">날짜</p>
                    <p className="item">물품</p>
                    <p className="place">장소</p>
                </li>
                {lostItemList.length === 0 ? (
                    <p>아직 데이터가 없습니다.</p>
                ) : (
                    lostItemList.map((lostItem, idx) => {
                        return (
                            <li key={idx}>
                                <img
                                    src={lostItem.image && lostItem.image}
                                    alt="분실물"
                                />
                                <p>
                                    {lostItem.cretedDate &&
                                        lostItem.createdDate}
                                </p>
                                <p>{lostItem.item && lostItem.item}</p>
                                <p>{lostItem.place && lostItem.place}</p>
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
