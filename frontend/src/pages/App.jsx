import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ChattingPage from './ChattingPage/ChattingPage';
import TaxiPage from './TaxiPage/TaxiPage';

function App() {
    const { isBusModalOpen } = useSelector(state => state.user);
    const { isTaxiModalOpen } = useSelector(state => state.user);
    const { isTaxiCreateModalOpen } = useSelector(state => state.taxi);
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
                            <Header />
                            <TaxiPage />
                        </>
                    }
                />
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
                <Route path="/chatroom/:id" element={<ChattingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
