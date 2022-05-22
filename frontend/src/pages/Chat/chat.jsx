import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function ChatPage() {
    const sock = new SockJS('http://localhost:8080/chat');
    const client = Stomp.over(sock);
    console.log(client);

    return <div>ChatPage</div>;
}

export default ChatPage;
