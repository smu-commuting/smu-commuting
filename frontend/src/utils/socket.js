/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const sock = new SockJS(`${process.env.REACT_APP_API_URL}/chat`);
const ws = Stomp.over(sock);

// let recv;

export const connect = id => {
    ws.connect(
        {},
        frame => {
            ws.subscribe(`/sub/chat/room/${id}`, function (msg) {
                const recv = JSON.parse(msg.body);
                console.log(recv); // 보낸 메세지, 온 메세지
            });
        },
        error => {
            console.log(error);
        },
    );
};

export const waitForConnection = (stompClient, callback) => {
    setTimeout(
        () => {
            // 연결되었을 때 콜백함수 실행
            if (stompClient.ws.readyState === 1) {
                callback();
                // 연결이 안 되었으면 재호출
            } else {
                waitForConnection(stompClient, callback);
            }
        },
        1, // 밀리초 간격으로 실행
    );
};

export const sendIo = ({ myChat, id, userId, studentId }) => {
    waitForConnection(ws, () => {
        ws.send(
            '/pub/chat/message',
            {},
            JSON.stringify({
                messageType: 'TALK',
                message: myChat,
                roomId: id,
                senderId: userId,
                studentId,
            }),
        );
    });
};
