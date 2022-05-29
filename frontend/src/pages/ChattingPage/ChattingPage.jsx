/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './ChattingPage.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChattingRoomHeader from '../../components/ChattingRoomPage/ChattingRoomHeader/ChattingRoomHeader';
import Refusal from '../../assets/ChattingList/ChatInputArea/합승거부.png';
import { getChatMessageList } from '../../modules/reducers/chat';
import { firstEnterDateParser } from '../../constants/FirstEnterDateParser';
import { connect, sendIo } from '../../utils/socket';
import MeChatBox from '../../components/ChattingRoomPage/MeChatBox/MeChatBox';
import SenderChatBox from '../../components/ChattingRoomPage/SenderChatBox/SenderChatBox';

function ChattingPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.me.id);
    const studentId = useSelector(state => state.user.me.studentId);
    const { chatMessageList, chatMessageListLoading, chatLoadEnd } =
        useSelector(state => state.chat);

    const [myChat, setMyChat] = useState();
    const myChatChange = e => {
        setMyChat(e.target.value);
    };

    useEffect(() => {
        connect();
        dispatch(
            getChatMessageList({
                roomId: id,
                size: 10,
                date: firstEnterDateParser(),
            }),
        );
        window.scrollTo(0, document.body.offsetHeight);
        console.log(document.body.offsetHeight);
    }, []);

    useEffect(() => {
        function onScroll() {
            if (window.scrollY <= 7) {
                console.log(chatLoadEnd, chatMessageListLoading);
                if (!chatLoadEnd && !chatMessageListLoading) {
                    // 요청 간 이후 한번만 dispatch
                    dispatch(
                        getChatMessageList({
                            roomId: id,
                            size: 10,
                            date: chatMessageList.slice(-1)[0].createdTime,
                        }),
                    );
                    console.log(chatMessageList);
                    window.scrollTo(0, window.innerHeight);
                    console.log(
                        '로딩 후 사용자 스크롤 :',
                        window.scrollY,
                        '내 폰 높이',
                        window.innerHeight,
                        '전체 컨텐츠 길이',
                        document.body.offsetHeight,
                    );
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [window.scrollY, chatLoadEnd]);

    const onSendMyChatHandler = e => {
        sendIo({ myChat, id, userId, studentId });
        console.log('클릭', myChat);
        setMyChat('');
    };

    return (
        <div className="chattingpage-wrapper">
            <ChattingRoomHeader />
            <div className="chattingroompage-wrapper">
                <p className="notice">
                    탑승 시각 기준 전후 1시간동안에는 <br /> 하나의 채팅방만
                    입장할 수 있습니다.
                </p>
                {chatMessageList &&
                    chatMessageList.map(message => {
                        return message.senderStudentId ===
                            parseInt(studentId, 10) ? (
                            <MeChatBox
                                content={message.content}
                                senderId={message.senderStudentId}
                                createdTime={message.createdTime}
                            />
                        ) : (
                            <SenderChatBox
                                content={message.content}
                                senderId={message.senderStudentId}
                                createdTime={message.createdTime}
                            />
                        );
                    })}
            </div>
            <div className="chatinputarea-wrapper">
                <div>
                    <img src={Refusal} alt="합승거부" />
                </div>
                <textarea value={myChat} onChange={myChatChange} required />
                <button type="submit" onClick={onSendMyChatHandler}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChattingPage;
