/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import BusModal from '../components/BusPage/BusClickModal/BusClickModal';
import TaxiModal from '../components/TaxiPage/TaxiClickModal/TaxiClickModal';
import TaxiCreateModal from '../components/TaxiPage/TaxiCreateModal/TaxiCreateModal';
import Header from '../components/Header/Header';
import BusPage from './BusPage/BusPage';
import HomePage from './HomePage/HomePage';
import LogInPage from './LogInPage/LogInPage';
import LogInProcess from './LogInProcess/LogInProcess';
import SignUpPage from './SignUpPage/SignUpPage';
import ChattingListPage from './ChattingListPage/ChattingListPage';
import ChattingListHeader from '../components/ChattingListPage/ChattingListHeader/ChattingListHeader';
import ChattingListFooter from '../components/ChattingListPage/ChattingListFooter/ChattingListFooter';
import RefusalTaxiSharePage from './RefusalTaxiSharePage/RefusalTaxiSharePage';
import MyPage from './MyPage/MyPage';
import InquiryPage from './InquiryPage/InquiryPage';
import WithdrawalPage from './WithdrawalPage/WithdrawalPage';
import WithdrawalConfirmPage from './WithdrawalConfirmPage/WithdrawalConfirmPage';
import ManualPage from './ManualPage/ManualPage';
import InquiryDetailPage from './InquiryDetailPage/InquiryDetailPage';
import InquiryWritePage from './inquiryWritePage/inquiryWritePage';
import ChattingPage from './ChattingPage/ChattingPage';
import TaxiPage from './TaxiPage/TaxiPage';
import CommunityModal from '../components/CommunityPage/CommunityModal/CommunityModal';
import TaxiToChatModal from '../components/TaxiPage/TaxiToChatModal/TaxiToChatModal';
import TaxiNotEnterModal from '../components/TaxiPage/TaxiNotEnterModal/TaxiNotEnterModal';
import TaxiNotCreateModal from '../components/TaxiPage/TaxiNotCreateModal/TaxiNotCreateModal';
import TaxiPartyDeleteModal from '../components/TaxiPage/TaxiPartyDeleteModal/TaxiPartyDeleteModal';
import TaxiPartyDeleteCompleteModal from '../components/TaxiPage/TaxiPartyDeleteCompleteModal/TaxiPartyDeleteCompleteModal';
import LostItemPage from './lostItemPage/lostItemPage';
import LostItemDetailPage from './lostItemDetailPage/lostItemDetailPage';
import LostItemWritePage from './lostItemWritePage/lostItemWritePage';
import ProtestPage from './ProtestPage/ProtestPage';
import { firebaseConfig } from '../constants/firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);

const messaging = getMessaging();

getToken(messaging, {
    vapidKey:
        'BNglI-efqMG6EoE8u72FXsYiGGFL94A9M7SdKDWrqFeqA1qL8mLwVd5Mm3sVTO2km4IFu-CABXjO7Bnw9aAKsMw',
})
    .then(currentToken => {
        if (currentToken) {
            console.log('파베토큰', currentToken);
        } else {
            // Show permission request UI
            console.log(
                'No registration token available. Request permission to generate one.',
            );
            // ...
        }
    })
    .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });

onMessage(messaging, payload => {
    console.log('Message received. ', payload);
    console.log('messaging. ', messaging);
});
function App() {
    const { isBusModalOpen, isTaxiModalOpen, isCommunityModalOpen } =
        useSelector(state => state.user);
    const {
        isTaxiCreateModalOpen,
        isEnterChattingRoomModalOpen,
        showErrorModal,
        showCreateErrorModal,
        isDeleteTaxiPartyModal,
        isDeleteAllowModal,
    } = useSelector(state => state.taxi);

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
                            {isTaxiModalOpen && <TaxiModal />}
                            {isCommunityModalOpen && <CommunityModal />}
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
                            {isTaxiModalOpen && <TaxiModal />}
                            <Header />
                            <BusPage />
                        </>
                    }
                />
                <Route
                    path="/taxi/:placeId/:date/:placeName"
                    element={
                        <>
                            {isTaxiModalOpen && <TaxiModal />}
                            {isTaxiCreateModalOpen && <TaxiCreateModal />}
                            {isEnterChattingRoomModalOpen && (
                                <TaxiToChatModal />
                            )}
                            {isDeleteAllowModal && (
                                <TaxiPartyDeleteCompleteModal />
                            )}
                            {showErrorModal && <TaxiNotEnterModal />}
                            {showCreateErrorModal && <TaxiNotCreateModal />}
                            <Header />
                            <TaxiPage />
                        </>
                    }
                />
                <Route
                    path="/chatlist"
                    element={
                        <>
                            {isDeleteTaxiPartyModal && <TaxiPartyDeleteModal />}
                            {isDeleteAllowModal && (
                                <TaxiPartyDeleteCompleteModal />
                            )}
                            <ChattingListHeader />
                            <ChattingListPage />
                            <ChattingListFooter />
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
                <Route
                    path="/chatroom/:id"
                    element={
                        <>
                            {isDeleteTaxiPartyModal && <TaxiPartyDeleteModal />}
                            {isDeleteAllowModal && (
                                <TaxiPartyDeleteCompleteModal />
                            )}
                            <ChattingPage />
                        </>
                    }
                />
                <Route
                    path="/lostitem"
                    element={
                        <LostItemPage />
                    }
                />
                <Route
                    path="/lostitemdetail"
                    element={<LostItemDetailPage />}
                />
                <Route path="/lostitemwrite" element={<LostItemWritePage />} />
                <Route path="/protest" element={<ProtestPage />} />
            </Routes>
        </Router>
    );
}

export default App;
