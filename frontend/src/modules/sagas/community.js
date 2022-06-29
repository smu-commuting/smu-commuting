/* eslint-disable no-unused-vars */
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    COMMUNITY_GET_LOST_ITEM_LIST_REQUEST,
    COMMUNITY_GET_LOST_ITEM_LIST_SUCCESS,
    COMMUNITY_GET_LOST_ITEM_LIST_FAILURE,
    COMMUNITY_LIST_DELETE_REQUEST,
    COMMUNITY_LIST_DELETE_SUCCESS,
    COMMUNITY_LIST_DELETE_FAILURE,
    COMMUNITY_GET_DETAIL_INFO_REQUEST,
    COMMUNITY_GET_DETAIL_INFO_SUCCESS,
    COMMUNITY_GET_DETAIL_INFO_FAILURE,
    COMMUNITY_CLICK_DETAIL_UD_MODAL_REQUEST,
    COMMUNITY_CLICK_DETAIL_UD_MODAL_SUCCESS,
    COMMUNITY_CLICK_DETAIL_UD_MODAL_FAILURE,
} from '../../constants';
import { getDetailInfoApi, getLostItemListApi } from '../../utils/communityApi';

function* getLostItemList(action) {
    try {
        const result = yield call(getLostItemListApi, action.data);
        yield put({
            type: COMMUNITY_GET_LOST_ITEM_LIST_SUCCESS,
            data: result.data.data,
        });
    } catch (err) {
        yield put({
            type: COMMUNITY_GET_LOST_ITEM_LIST_FAILURE,
            error: err,
        });
    }
}

function* deleteLostItemList() {
    try {
        yield put({
            type: COMMUNITY_LIST_DELETE_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: COMMUNITY_LIST_DELETE_FAILURE,
            error: err,
        });
    }
}

function* getLostItemDetailInfo(action) {
    try {
        const result = yield call(getDetailInfoApi, action.id);
        console.log('요청 이후', result.data.data);
        yield put({
            type: COMMUNITY_GET_DETAIL_INFO_SUCCESS,
            data: result.data.data,
        });
    } catch (err) {
        yield put({
            type: COMMUNITY_GET_DETAIL_INFO_FAILURE,
            error: err,
        });
    }
}

function* isClickDetailUpdateDeleteModal() {
    try {
        yield put({
            type: COMMUNITY_CLICK_DETAIL_UD_MODAL_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: COMMUNITY_CLICK_DETAIL_UD_MODAL_FAILURE,
        });
    }
}

function* watchGetLostItemList() {
    yield takeLatest(COMMUNITY_GET_LOST_ITEM_LIST_REQUEST, getLostItemList);
}
function* watchDeleteLostItemList() {
    yield takeLatest(COMMUNITY_LIST_DELETE_REQUEST, deleteLostItemList);
}
function* watchGetLostItemDetailInfo() {
    yield takeLatest(COMMUNITY_GET_DETAIL_INFO_REQUEST, getLostItemDetailInfo);
}
function* watchIsClickDetailUpdateDeleteModal() {
    yield takeLatest(
        COMMUNITY_CLICK_DETAIL_UD_MODAL_REQUEST,
        isClickDetailUpdateDeleteModal,
    );
}

export default function* communitySaga() {
    yield all([
        fork(watchGetLostItemList),
        fork(watchDeleteLostItemList),
        fork(watchGetLostItemDetailInfo),
        fork(watchIsClickDetailUpdateDeleteModal),
    ]);
}
