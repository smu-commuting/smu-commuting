import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusModal from '../components/BusPage/BusClickModal/BusClickModal';
import Header from '../components/Header/Header';
import BusPage from './BusPage/BusPage';
import HomePage from './HomePage/HomePage';
import LogInPage from './LogInPage/LogInPage';
import LogInProcess from './LogInProcess/LogInProcess';
import SignUpPage from './SignUpPage/SignUpPage';
import ChatingTestPage from './ChatingTestPage/ChatingTestPage';
import ChattingListPage from './ChattingListPage/ChattingListPage';
import ChattingListHeader from '../components/ChattingListPage/ChattingListHeader/ChattingListHeader';
import ChattingListFooter from '../components/ChattingListPage/ChattingListFooter/ChattingListFooter';
import ChattingRoomPage from './ChattingRoomPage/ChattingRoomPage';
import ChattingRoomHeader from '../components/ChattingRoomPage/ChattingRoomHeader/ChattingRoomHeader';
import ChatInputArea from '../components/ChattingRoomPage/ChatInputArea/ChatInputArea';
import RefusalTaxiSharePage from './RefusalTaxiSharePage/RefusalTaxiSharePage';
import MyPage from './MyPage/MyPage';
import NotificationPage from './NotificationPage/NotificationPage';
import InquiryPage from './InquiryPage/InquiryPage';
import WithdrawalPage from './WithdrawalPage/WithdrawalPage';

function App() {
    const { isBusModalOpen } = useSelector(state => state.user);
    return (
        <Router>
            <Routes>
                <Route
                    path="/callback/:id/:accessToken/:studentId"
                    element={<LogInProcess />}
                />
                <Route path="/" element={<LogInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                    path="/home"
                    element={
                        <>
                            {isBusModalOpen && <BusModal />}
                            <Header />
                            <HomePage />
                        </>
                    }
                />
                <Route
                    path="/bus/:busNum"
                    element={
                        <>
                            {isBusModalOpen && <BusModal />}
                            <Header />
                            <BusPage />
                        </>
                    }
                />
                <Route path="/chat/test" element={<ChatingTestPage />} />
                <Route
                    path="/chatlist"
                    element={
                        <>
                            <ChattingListHeader />
                            <ChattingListPage />
                            <ChattingListFooter />
                        </>
                    }
                />
                <Route
                    path="/chatroom/:id"
                    element={
                        <>
                            <ChattingRoomHeader />
                            <ChattingRoomPage />
                            <ChatInputArea />
                        </>
                    }
                />
                <Route path="/refusal" element={<RefusalTaxiSharePage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/withdrawal" element={<WithdrawalPage />} />
            </Routes>
        </Router>
    );
}

export default App;
