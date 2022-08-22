/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Arrow from '../../assets/MyPage/arrow.png';
import Menu from '../../assets/LostItemDetailPage/menu.png';
import './lostItemDetailPage.scss';
import {
    getLostItemDetailInfo,
    getReplyList,
    isClickDetailUpdateDeleteModal,
} from '../../modules/reducers/community';
import ImgDownload from '../../components/CommunityPage/ImgDownload/ImgDownload';
import LostItemReplyBox from '../../components/CommunityPage/LostItemReplyBox/LostItemReplyBox';

const lostItemDetailPage = () => {
    const { id } = useParams();
    const { lostItemInfo, lostItemInfoDone, replyList, replyPostDone } =
        useSelector(state => state.community);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imgClick, setImgClick] = useState(false);

    const lostItemPage = () => {
        navigate(`/lostitem`);
    };

    const onPostModalClick = useCallback(() => {
        dispatch(isClickDetailUpdateDeleteModal());
    }, [dispatch]);

    const imgZoom = () => {
        setImgClick(prev => !prev);
    };

    useEffect(() => {
        dispatch(getLostItemDetailInfo(id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getReplyList(id));
    }, [dispatch, replyPostDone]);

    return (
        <div className="lostitemdetailpage-wrapper">
            <div className="lostitemdetailpage-header">
                <img
                    className="arrow"
                    src={Arrow}
                    alt="화살표"
                    onClick={lostItemPage}
                    aria-hidden="true"
                />
                <div>분실물 - 상세 페이지</div>
                {lostItemInfo && lostItemInfo.isMine === true && (
                    <img
                        className="menu"
                        src={Menu}
                        alt="메뉴"
                        aria-hidden="true"
                        onClick={onPostModalClick}
                    />
                )}
            </div>
            <div className="lostitemdetailpage-content">
                <div className="lostitemdetailpage-content">
                    <div className="header">
                        <p className="date">
                            {lostItemInfo &&
                                `${
                                    lostItemInfo.createdDate
                                        .split('T')[0]
                                        .split('-')[1]
                                }월
                            ${
                                lostItemInfo.createdDate
                                    .split('T')[0]
                                    .split('-')[2]
                            }일`}
                        </p>
                        <p className="item">
                            {lostItemInfo && lostItemInfo.item}
                        </p>
                        <p className="place">
                            {lostItemInfo && lostItemInfo.place}
                        </p>
                    </div>
                    <div className="content">
                        {lostItemInfo && lostItemInfo.content}
                    </div>
                    <div className="item-picture" onClick={imgZoom} aria-hidden>
                        <img
                            src={lostItemInfo && lostItemInfo.image}
                            alt="분실물 사진"
                        />
                    </div>
                </div>
            </div>
            {replyList &&
                replyList.map((reply, idx) => {
                    return (
                        <LostItemReplyBox
                            reply={reply}
                            key={reply.createdDate}
                        />
                    );
                })}
        </div>
    );
};

export default lostItemDetailPage;
