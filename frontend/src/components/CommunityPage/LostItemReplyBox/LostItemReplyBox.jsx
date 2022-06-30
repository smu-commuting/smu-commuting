/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import './LostItemReplyBox.scss';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../../assets/LostItemDetailPage/menu.png';
import Sumung from '../../../assets/LostItemDetailPage/sumung.jpg';
import ReplyUpdateDeleteModal from '../ReplyUpdateDeleteModal/ReplyUpdateDeleteModal';
import { replyModalClick } from '../../../modules/reducers/community';

function LostItemReplyBox({ reply }) {
    const dispatch = useDispatch();
    const [time, setTime] = useState();
    const onReplyModal = useCallback(() => {
        const data = {
            // id : reply.id,
            id: 1,
            data: reply.content,
        };
        dispatch(replyModalClick(data));
    }, [dispatch]);
    useEffect(() => {
        const today = new Date();
        const todayDate = `${today.getFullYear()}-${
            today.getMonth() + 1 >= 10
                ? today.getMonth() + 1
                : `0${today.getMonth() + 1}`
        }-${today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`}`;
        if (todayDate === reply.createdDate.split('T')[0])
            setTime(reply.createdDate.split('T')[1]);
        else {
            setTime(
                `${reply.createdDate.split('T')[0].split('-')[1]}월 ${
                    reply.createdDate.split('T')[0].split('-')[2]
                }일`,
            );
        }
    }, []);
    return (
        <div className="lostitemreply-box-wrapper">
            <div className="lostitemreply-box-header">
                <div className="left">
                    <img className="sumung" src={Sumung} alt="스뭉" />
                    <p className="number">{reply && reply.writer}</p>
                </div>
                <div className="right">
                    <p className="write-date">{time}</p>
                    {reply && reply.isMine && (
                        <img
                            className="menu"
                            src={Menu}
                            alt="메뉴"
                            aria-hidden="true"
                            onClick={() => {
                                onReplyModal();
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="lostitemreply-box-content">
                <p className="content">{reply && reply.content}</p>
            </div>
        </div>
    );
}

export default LostItemReplyBox;
