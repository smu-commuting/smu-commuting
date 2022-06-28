/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import './ImgDownload.scss';
import Download from '../../../assets/LostItemDetailPage/download-white.png';
import Cancel from '../../../assets/LostItemDetailPage/cancel.png';

function ImgDownload({ img, imgZoom }) {
    const imgDownload = useRef();
    const onDownload = () => {
        imgDownload.current.click();
    };

    return (
        <div>
            <div className="download-wrapper">
                <div className="download-header">
                    <img
                        className="cancel"
                        src={Cancel}
                        alt="취소"
                        onClick={imgZoom}
                        aria-hidden
                    />
                    <img
                        className="download"
                        src={Download}
                        alt="다운로드"
                        onClick={onDownload}
                        aria-hidden
                    />
                    <a
                        href={img && img}
                        download
                        style={{ display: 'none' }}
                        ref={imgDownload}
                    >
                        다운
                    </a>
                </div>
                <div className="img-wrapper">
                    <img
                        className="zoom-img"
                        src={img && img}
                        alt="분실물 사진"
                    />
                </div>
            </div>
        </div>
    );
}

export default ImgDownload;
