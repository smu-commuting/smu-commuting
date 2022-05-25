import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import LogInPage from './LogInPage/LogInPage';
import LogInProcess from './LogInProcess/LogInProcess';
import SignUpPage from './SignUpPage/SignUpPage';
import RefusalTaxiSharePage from './RefusalTaxiSharePage/RefusalTaxiSharePage';
import MyPage from './MyPage/MyPage';
import NotificationPage from './NotificationPage/NotificationPage';
import InquiryPage from './InquiryPage/InquiryPage';
import WithdrawalPage from './WithdrawalPage/WithdrawalPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/callback/:id/:accessToken/:studentId"
                    element={<LogInProcess />}
                />
                <Route path="/" element={<LogInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
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
