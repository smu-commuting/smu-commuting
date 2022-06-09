import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { communityModalClick } from '../../../modules/reducers/user';
import './CommunityModal.scss';
import cancel from '../../../assets/CommunityPage/cancel.png';
import lost from '../../../assets/CommunityPage/lost-1.png';
import seewe from '../../../assets/CommunityPage/seewi-1.png';

function CommunityModal() {
    const dispatch = useDispatch();
    const onCommunityClick = useCallback(() => {
        dispatch(communityModalClick());
    }, [dispatch]);
    return (
        <div className="communitymodal-wrapper">
            <div className="communitymodal">
                <img
                    src={cancel}
                    className="cancel"
                    alt="cancel"
                    aria-hidden
                    onClick={onCommunityClick}
                />
                <div style={{ clear: 'both' }} />
                <div className="inner-wrapper">
                    <p>
                        커뮤니티 게시판을 <br />
                        선택해 주세요.
                    </p>
                    <div className="community-wrapper">
                        <div className="lost">
                            <img src={lost} alt="분실물" />
                            <p>분실물</p>
                        </div>
                        <div className="seewe">
                            <img src={seewe} alt="시위정보" />
                            <p>시위정보</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityModal;
