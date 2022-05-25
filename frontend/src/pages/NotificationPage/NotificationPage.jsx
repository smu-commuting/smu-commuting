import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import './NotificationPage.scss';

function NotificationPage() {
    const navigate = useNavigate();

    const myPage = async () => {
        navigate(`/mypage`);
    };

    return (
        <div className="notificationpage-wrapper">
            <div className="notificationpage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={myPage}
                    aria-hidden="true"
                />
                <div>알림 설정</div>
            </div>
        </div>
    );
}

export default NotificationPage;
