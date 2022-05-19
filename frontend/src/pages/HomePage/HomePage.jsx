import React from 'react';
import './HomePage.scss';
import Bus from '../../assets/HomePage/버스-2.png';
import Taxi from '../../assets/HomePage/택시-2.png';
import Community from '../../assets/HomePage/커뮤니티-2.png';
import Manual from '../../assets/HomePage/매뉴얼-3.png';

function HomePage() {
    return (
        <div className="homepage-wrapper">
            <div className="homepage-top-line">
                <div>
                    <img src={Bus} alt="버스" />
                </div>
                <div>
                    <img src={Taxi} alt="택시" />
                </div>
            </div>
            <div className="homepage-bottom-line">
                <div>
                    <img src={Community} alt="커뮤니티" />
                </div>
                <div>
                    <img src={Manual} alt="매뉴얼" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
