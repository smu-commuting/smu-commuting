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
import InquiryPage from './InquiryPage/InquiryPage';
import WithdrawalPage from './WithdrawalPage/WithdrawalPage';
import WithdrawalConfirmPage from './WithdrawalConfirmPage/WithdrawalConfirmPage';
import ManualPage from './ManualPage/ManualPage';
import InquiryDetailPage from './InquiryDetailPage/InquiryDetailPage';
import InquiryWritePage from './inquiryWritePage/inquiryWritePage';

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
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/withdrawal" element={<WithdrawalPage />} />
                <Route path="/confirm" element={<WithdrawalConfirmPage />} />
                <Route path="/manual" element={<ManualPage />} />
                <Route path="/inquirydetail" element={<InquiryDetailPage />} />
                <Route path="/inquirywrite" element={<InquiryWritePage />} />
            </Routes>
        </Router>
    );
}

export default App;
