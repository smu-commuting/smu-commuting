/* eslint-disable no-unused-vars */
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    USER_LOG_IN_REQUEST,
    USER_LOG_IN_SUCCESS,
    USER_LOG_IN_FAILURE,
    USER_SIGN_UP_REQUEST,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_BUS_MODAL,
    USER_BUS_MODAL_SUCCESS,
    USER_BUS_MODAL_FAILURE,
    USER_TAXI_MODAL,
    USER_TAXI_MODAL_SUCCESS,
    USER_TAXI_MODAL_FAILURE,
    USER_COMMUNITY_MODAL,
    USER_COMMUNITY_MODAL_SUCCESS,
    USER_COMMUNITY_MODAL_FAILURE,
    USER_INFO_GET_REQUEST,
    USER_INFO_GET_SUCCESS,
    USER_INFO_GET_FAILURE,
    USER_GET_PROFILE_IMG_LIST_REQUEST,
    USER_GET_PROFILE_IMG_LIST_SUCCESS,
    USER_GET_PROFILE_IMG_LIST_FAILURE,
    USER_GET_BLOCKED_LIST_REQUEST,
    USER_GET_BLOCKED_LIST_SUCCESS,
    USER_GET_BLOCKED_LIST_FAILURE,
} from '../../constants';
import {
    userInfoReadApi,
    userInfoUpdateApi,
    getProfileListApi,
    signupApi,
} from '../../utils';
import { getBlockedUserApi } from '../../utils/authApi';

function* login(action) {
    console.log('saga In action', action);
    try {
        yield put({
            type: USER_LOG_IN_SUCCESS,
            data: action,
        });
    } catch (err) {
        yield put({
            type: USER_LOG_IN_FAILURE,
            err,
        });
    }
}

function* signup(action) {
    try {
        yield put({
            type: USER_SIGN_UP_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: USER_SIGN_UP_FAILURE,
            error: err,
        });
    }
}

function* busmodal() {
    try {
        yield put({
            type: USER_BUS_MODAL_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: USER_BUS_MODAL_FAILURE,
            error: err,
        });
    }
}

function* taximodal() {
    try {
        yield put({
            type: USER_TAXI_MODAL_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: USER_TAXI_MODAL_FAILURE,
            error: err,
        });
    }
}

function* communitymodal() {
    try {
        yield put({
            type: USER_COMMUNITY_MODAL_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: USER_COMMUNITY_MODAL_FAILURE,
            error: err,
        });
    }
}

function* getUserInfo() {
    try {
        const result = yield call(userInfoReadApi);
        console.log('saga profile', result);
        yield put({
            type: USER_INFO_GET_SUCCESS,
            data: result.data.data,
        });
    } catch (err) {
        yield put({
            type: USER_INFO_GET_FAILURE,
            error: err,
        });
    }
}

function* getProfileImgList() {
    try {
        const result = yield call(getProfileListApi);
        console.log('saga - profile Img List result', result);
        yield put({
            type: USER_GET_PROFILE_IMG_LIST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: USER_GET_PROFILE_IMG_LIST_FAILURE,
            error: err,
        });
    }
}

function* getBlockedUserList() {
    try {
        const result = yield call(getBlockedUserApi);
        console.log('saga - Blocked User List', result);
        yield put({
            type: USER_GET_BLOCKED_LIST_SUCCESS,
            data: result.data.data,
        });
    } catch (err) {
        yield put({
            type: USER_GET_BLOCKED_LIST_FAILURE,
            error: err,
        });
    }
}

function* watchLogin() {
    yield takeLatest(USER_LOG_IN_REQUEST, login);
}

function* watchSignUp() {
    yield takeLatest(USER_SIGN_UP_REQUEST, signup);
}

function* watchBusModal() {
    yield takeLatest(USER_BUS_MODAL, busmodal);
}

function* watchTaxiModal() {
    yield takeLatest(USER_TAXI_MODAL, taximodal);
}

function* watchCommunityModal() {
    yield takeLatest(USER_COMMUNITY_MODAL, communitymodal);
}

function* watchGetUserInfo() {
    yield takeLatest(USER_INFO_GET_REQUEST, getUserInfo);
}

function* watchGetProfileImgList() {
    yield takeLatest(USER_GET_PROFILE_IMG_LIST_REQUEST, getProfileImgList);
}
function* watchGetBlockedUserList() {
    yield takeLatest(USER_GET_BLOCKED_LIST_REQUEST, getBlockedUserList);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchBusModal),
        fork(watchTaxiModal),
        fork(watchCommunityModal),
        fork(watchGetUserInfo),
        fork(watchGetProfileImgList),
        fork(watchGetBlockedUserList),
    ]);
}
