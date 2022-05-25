import React, { useCallback } from 'react';
import './HomePage.scss';
import { useDispatch } from 'react-redux';
import Bus from '../../assets/HomePage/버스-2.png';
import Taxi from '../../assets/HomePage/택시-2.png';
import Community from '../../assets/HomePage/커뮤니티-2.png';
import Manual from '../../assets/HomePage/매뉴얼-3.png';
import { busModalClick } from '../../modules/reducers/user';

function HomePage() {
    const dispatch = useDispatch();
    const onBusClick = useCallback(() => {
        dispatch(busModalClick());
    }, [dispatch]);
    return (
        <div className="homepage-inner-wrapper">
            <div className="homepage-top-line">
                <div>
                    <img
                        src={Bus}
                        alt="버스"
                        onClick={onBusClick}
                        aria-hidden="true"
                    />
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
