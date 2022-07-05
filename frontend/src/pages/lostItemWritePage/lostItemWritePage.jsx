/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/MyPage/arrow.png';
import picture from '../../assets/LostItemWritePage/picture.png';
import cancel from '../../assets/LostItemWritePage/cancel.png';
import './lostItemWritePage.scss';
import { postLostItemApi } from '../../utils/communityApi';

const lostItemWritePage = () => {
    const navigate = useNavigate();
    const imgRef = useRef();
    const lostItemPage = () => {
        navigate(`/lostitem`);
    };
    const [image, setImage] = useState();
    const [previewImg, setPreviewImg] = useState();
    const [today, setToday] = useState(new Date());
    const [info, setInfo] = useState({
        content: '',
        item: null,
        place: null,
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
            console.log(info.obtainDate);
            if (image) {
                formData.append('image', image);
            } else {
                alert('이미지를 추가해주세요');
                return;
            }
            formData.append(
                'info',
                new Blob([JSON.stringify(info)], { type: 'application/json' }),
            );
            postLostItemApi(formData)
                .then(res => lostItemPage())
                .catch(err => alert('글을 게시할 수 없습니다.'));
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
                        onClick={lostItemPage}
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
                        defaultValue={info.item && info.item}
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
                        placeholder="내용을 입력해주세요."
                        defaultValue={info.content && info.content}
                        onChange={onInfoChange}
                        required
                    />
                    <p className="content-limit">{info.content.length} 자</p>
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
};

export default lostItemWritePage;
