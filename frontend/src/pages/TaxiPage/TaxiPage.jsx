import React from 'react';
// import { useParams } from 'react-router-dom';
import './TaxiPage.scss';
import taxi from '../../assets/TaxiPage/taxi.png';

function TaxiPage() {
    // const { placeId, date } = useParams();
    return (
        <div className="taxipage-wrapper">
            <img src={taxi} alt="taxi" />
        </div>
    );
}

export default TaxiPage;
