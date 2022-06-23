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
} from '../../constants';
import { signupApi } from '../../utils';

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
        const result = yield call(signupApi, action.data);
        yield put({
            type: USER_SIGN_UP_SUCCESS,
            data: result.data,
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

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchBusModal),
        fork(watchTaxiModal),
        fork(watchCommunityModal),
    ]);
}
