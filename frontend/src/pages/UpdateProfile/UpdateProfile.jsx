/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileImgList } from '../../modules/reducers/user';
import './UpdateProfile.scss';
import Arrow from '../../assets/MyPage/arrow.png';
import { userInfoUpdateApi } from '../../utils';

function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profileImgList } = useSelector(state => state.user);
    const [selectPicId, setSelectedPicId] = useState();
    useEffect(() => {
        dispatch(getProfileImgList());
    }, [dispatch]);
    const goBack = useCallback(() => {
        navigate(-1);
    }, []);
    const onSubmitPicId = useCallback(() => {
        if (selectPicId === undefined) {
            alert('선택된 캐릭터가 없습니다.');
            return;
        }
        userInfoUpdateApi(selectPicId)
            .then(res => {
                navigate('/mypage');
            })
            .catch(err => {
                console.log(err);
            });
    }, [selectPicId]);
    return (
        <div className="updateprofile-wrapper">
            <div className="updateprofile-header">
                <div className="arrow">
                    <img
                        src={Arrow}
                        alt="화살표"
                        onClick={goBack}
                        aria-hidden="true"
                    />
                </div>
                <div className="setting">
                    <div>프로필 변경</div>
                </div>
                <div className="submit">
                    <button type="submit" onClick={onSubmitPicId}>
                        변경
                    </button>
                </div>
            </div>
            <div className="item-container">
                {profileImgList &&
                    profileImgList.map(profileImg => {
                        return (
                            <div
                                className={
                                    selectPicId === profileImg.imageId
                                        ? 'select-item'
                                        : 'item'
                                }
                                onClick={() => {
                                    setSelectedPicId(profileImg.imageId);
                                }}
                                aria-hidden
                            >
                                <img
                                    key={profileImg.id}
                                    src={profileImg.url}
                                    alt="목록"
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default UpdateProfile;
