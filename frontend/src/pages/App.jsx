import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import HomePage from './HomePage/HomePage';
import LogInPage from './LogInPage/LogInPage';
import LogInProcess from './LogInProcess/LogInProcess';
import SignUpPage from './SignUpPage/SignUpPage';
import ChatPage from './Chat/chat';

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
                <Route
                    path="/home"
                    element={
                        <>
                            <Header />
                            <HomePage />
                        </>
                    }
                />
                <Route path="/chat/test" element={<ChatPage />} />
            </Routes>
        </Router>
    );
}

export default App;
