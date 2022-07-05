/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLostItemDetailInfo } from '../../modules/reducers/community';
import Arrow from '../../assets/MyPage/arrow.png';
import picture from '../../assets/LostItemWritePage/picture.png';
import cancel from '../../assets/LostItemWritePage/cancel.png';
import './LostItemEditPage.scss';
import { editDetailInfoApi } from '../../utils/communityApi';

function LostItemEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const imgRef = useRef();
    const { lostItemInfo } = useSelector(state => state.community);
    const lostItemDetailPage = () => {
        navigate(`/lostitemdetail/${id}`);
    };
    const [image, setImage] = useState(lostItemInfo.image);
    const [previewImg, setPreviewImg] = useState(lostItemInfo.image);
    const [today, setToday] = useState(new Date());
    const [imageChanged, setImageChanged] = useState(false);
    const [info, setInfo] = useState({
        content: lostItemInfo.content,
        item: lostItemInfo.item,
        place: lostItemInfo.place,
        obtainDate: `${today.getFullYear()}-${
            today.getMonth() + 1 >= 10
                ? today.getMonth() + 1
                : `0${today.getMonth() + 1}`
        }-${today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`}`,
    });

    const onImgSelect = useCallback(() => {
        imgRef.current.click();
    }, []);

    const onInfoChange = useCallback(
        e => {
            setInfo({
                ...info,
                [e.target.name]: e.target.value,
            });
        },
        [info],
    );

    const onFileChange = e => {
        const reader = new FileReader();
        setImage(e.target.files[0]);
        setImageChanged(true);
        console.log(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = finished => {
            setPreviewImg(finished.target.result);
            e.target.value = '';
        };
    };

    const onDeleteURL = useCallback(() => {
        setPreviewImg(null);
        setImage(null);
    }, [previewImg, image]);

    const onSubmitHandler = useCallback(
        e => {
            e.preventDefault();
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            } else {
                alert('이미지를 추가해주세요');
                return;
            }
            const temp = { ...info, imageChanged };
            console.log(temp);
            formData.append(
                'info',
                new Blob([JSON.stringify(temp)], { type: 'application/json' }),
            );
            const data = {
                id,
                formData,
            };
            editDetailInfoApi(data)
                .then(res => {
                    lostItemDetailPage();
                })
                .catch(err => alert('글을 수정할 수 없습니다.'));
        },
        [info.content, info.item, info.obtainDate, info.place, image],
    );
    return (
        <div className="lostitemwritepage-wrapper">
            <form onSubmit={onSubmitHandler}>
                <div className="lostitemwritepage-header">
                    <img
                        src={Arrow}
                        alt="화살표"
                        onClick={lostItemDetailPage}
                        aria-hidden="true"
                    />
                    <div>분실물 습득 등록</div>
                    <button className="regist-btn" type="submit">
                        등록
                    </button>
                </div>
                <div className="lostitemwritepage-content">
                    <input
                        name="item"
                        className="item-hash"
                        placeholder="# 습득 물품명을 간단한 해시태그로 입력해주세요."
                        value={info.item && info.item}
                        onChange={onInfoChange}
                        required
                    />
                    <input
                        name="place"
                        className="place-hash"
                        placeholder="# 습득 장소명을 간단한 해시태그로 입력해주세요."
                        defaultValue={info.place && info.place}
                        onChange={onInfoChange}
                        required
                    />
                    <textarea
                        name="content"
                        className="content"
                        placeholder="내용을 입력해주세요. (200자 이내)"
                        defaultValue={info.content && info.content}
                        onChange={onInfoChange}
                        required
                    />
                    <p className="content-limit">{info.content.length} / 200</p>
                </div>
                {previewImg && (
                    <div className="preview-wrapper">
                        <img
                            className="preview-img"
                            src={previewImg}
                            accept="image/*"
                            width="100px"
                            height="120px"
                            alt="분실물미리보기"
                        />
                        <button
                            className="preview-cancel"
                            type="button"
                            onClick={() => {
                                onDeleteURL();
                            }}
                        >
                            <img src={cancel} alt="취소" />
                        </button>
                    </div>
                )}
                <input
                    name="file"
                    type="file"
                    onChange={onFileChange}
                    ref={imgRef}
                    hidden
                    accept="image/png, image/jpeg, image/jpg"
                />
                {!previewImg && (
                    <img
                        className="picture"
                        src={picture}
                        alt="picture"
                        aria-hidden
                        onClick={onImgSelect}
                    />
                )}
            </form>
        </div>
    );
}

export default LostItemEditPage;
