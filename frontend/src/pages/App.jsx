/* eslint-disable no-shadow */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import '../utils/fcm';
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
import LostItemDetailModal from '../components/CommunityPage/LostItemDetailModal/LostItemDetailModal';
import LostItemDeleteConfirmModal from '../components/CommunityPage/LostItemDeleteConfirmModal/LostItemDeleteConfirmModal';
import LostItemEditPage from './LostItemEditPage/LostItemEditPage';
import ReplyInputBox from '../components/CommunityPage/ReplyInputBox/ReplyInputBox';
import ReplyUpdateDeleteModal from '../components/CommunityPage/ReplyUpdateDeleteModal/ReplyUpdateDeleteModal';
import ReplyDeleteConfirmModal from '../components/CommunityPage/ReplyDeleteConfirmModal/ReplyDeleteConfirmModal';
import ProtectedRoutes from './ProtectedRoutes';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import ChattingListBusBtn from '../components/ChattingListPage/ChattingListBusBtn/ChattingListBusBtn';
import OpenChattingPage from './OpenChattingPage/OpenChattingPage';
import OpenChattingHeader from '../components/OpenChatting/OpenChattingHeader/OpenChattingHeader';
import DenialModal from '../components/ChattingRoomPage/DenialModal/DenialModal';
import ChangeMaximumModal from '../components/ChattingRoomPage/ChangeMaximumModal/ChangeMaximumModal';
import NotFoundPage from './NotFoundPage/NotFoundPage';

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
    const {
        isClickDetailUpdateDeleteModal,
        isReplyDetailUpdateDeleteModal,
        isDeleteConfirmModal,
        isReplyDeleteConfirmModal,
    } = useSelector(state => state.community);
    const { chatRoomPeopleModal, changeMaximumModal } = useSelector(
        state => state.chat,
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LogInPage />} />
                <Route
                    path="/callback/:id/:accessToken/:studentId"
                    element={<LogInProcess />}
                />
                {/* <Route element={<ProtectedRoutes />}> */}
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
                            <Toaster />
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
                            <Toaster />
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
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/mychatlist"
                    element={
                        <>
                            {isDeleteTaxiPartyModal && <TaxiPartyDeleteModal />}
                            {isDeleteAllowModal && (
                                <TaxiPartyDeleteCompleteModal />
                            )}
                            <ChattingListHeader />
                            <ChattingListBusBtn />
                            <ChattingListPage />
                            <ChattingListFooter />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/refusal"
                    element={
                        <>
                            <RefusalTaxiSharePage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/mypage"
                    element={
                        <>
                            <MyPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/updateprofile"
                    element={
                        <>
                            <UpdateProfile />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/inquiry"
                    element={
                        <>
                            <InquiryPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/withdrawal"
                    element={
                        <>
                            <WithdrawalPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/confirm"
                    element={
                        <>
                            <WithdrawalConfirmPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/manual"
                    element={
                        <>
                            <ManualPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/inquirydetail"
                    element={
                        <>
                            <InquiryDetailPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/inquirywrite"
                    element={
                        <>
                            <InquiryWritePage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/taxichat/:id"
                    element={
                        <>
                            {changeMaximumModal && <ChangeMaximumModal />}
                            {isDeleteTaxiPartyModal && <TaxiPartyDeleteModal />}
                            {isDeleteAllowModal && (
                                <TaxiPartyDeleteCompleteModal />
                            )}
                            {chatRoomPeopleModal && <DenialModal />}
                            <ChattingPage />
                        </>
                    }
                />
                <Route
                    path="/openchat/:id"
                    element={
                        <>
                            <OpenChattingHeader />
                            <OpenChattingPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/lostitem"
                    element={
                        <>
                            {isCommunityModalOpen && <CommunityModal />}
                            <LostItemPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/lostitemdetail/:id"
                    element={
                        <>
                            {isClickDetailUpdateDeleteModal && (
                                <LostItemDetailModal />
                            )}
                            {isDeleteConfirmModal && (
                                <LostItemDeleteConfirmModal />
                            )}
                            {isReplyDetailUpdateDeleteModal && (
                                <ReplyUpdateDeleteModal />
                            )}
                            {isReplyDeleteConfirmModal && (
                                <ReplyDeleteConfirmModal />
                            )}
                            <LostItemDetailPage />
                            <ReplyInputBox />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/lostitemwrite"
                    element={
                        <>
                            <LostItemWritePage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/lostitemedit/:id"
                    element={
                        <>
                            <LostItemEditPage />
                            <Toaster />
                        </>
                    }
                />
                <Route
                    path="/protest"
                    element={
                        <>
                            <ProtestPage />
                            <Toaster />
                        </>
                    }
                />
                {/* </Route> */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
