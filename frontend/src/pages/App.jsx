import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusModal from '../components/BusPage/BusClickModal/BusClickModal';
import Header from '../components/common/Header/Header';
import BusPage from './BusPage/BusPage';
import HomePage from './HomePage/HomePage';
import LogInPage from './LogInPage/LogInPage';
import LogInProcess from './LogInProcess/LogInProcess';
import SignUpPage from './SignUpPage/SignUpPage';
import ChatingTestPage from './ChatingTestPage/ChatingTestPage';
import ChattingListPage from './ChattingListPage/ChattingListPage';
import ChattingListHeader from '../components/common/ChattingListHeader/ChattingListHeader';
import ChattingListFooter from '../components/common/ChattingListFooter/ChattingListFooter';

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
            </Routes>
        </Router>
    );
}

export default App;
