import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import picture from '../../assets/LostItemWritePage/picture.png';
import './lostItemWritePage.scss';

const lostItemWritePage = () => {
    const navigate = useNavigate();

    const lostItemPage = () => {
        navigate(`/lostitem`);
    };

    return (
        <div className="lostitemwritepage-wrapper">
            <div className="lostitemwritepage-header">
                <img
                    src={Arrow}
                    alt="화살표"
                    onClick={lostItemPage}
                    aria-hidden="true"
                />
                <div>분실물 습득 글 쓰기</div>
                <button
                    className="regist-btn"
                    type="submit"
                    // onClick={}
                >
                    등록
                </button>
            </div>
            <div className="lostitemwritepage-content">
                <p className="item-hash">
                    # 습득 물품명을 간단한 해시태그로 입력해주세요.
                </p>
                <p className="place-hash">
                    # 습득 장소명을 간단한 해시태그로 입력해주세요.
                </p>
                <p className="content">내용을 입력해주세요. </p>
            </div>
            <img
                className="picture"
                src={picture}
                alt="picture"
                // onClick={}
                aria-hidden
            />
        </div>
    );
};

export default lostItemWritePage;
