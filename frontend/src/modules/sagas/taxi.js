import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    TAXI_LIST_FETCH_REQUEST,
    TAXI_LIST_FETCH_SUCCESS,
    TAXI_LIST_FETCH_FAILURE,
    TAXI_ROOM_DELETE_REQUEST,
    TAXI_ROOM_DELETE_SUCCESS,
    TAXI_ROOM_DELETE_FAILURE,
    TAXI_PLACE_LIST_REQUEST,
    TAXI_PLACE_LIST_SUCCESS,
    TAXI_PLACE_LIST_FAILURE,
    TAXI_PARTY_LIST_REQUEST,
    TAXI_PARTY_LIST_SUCCESS,
    TAXI_PARTY_LIST_FAILURE,
    TAXI_CREATE_MODAL_REQUEST,
    TAXI_CREATE_MODAL_SUCCESS,
    TAXI_CREATE_MODAL_FAILURE,
    TAXI_PAGE_DATE_REQUEST,
    TAXI_PAGE_DATE_SUCCESS,
    TAXI_PAGE_DATE_FAILURE,
    TAXI_PARTY_CREATE_REQUEST,
    TAXI_PARTY_CREATE_SUCCESS,
    TAXI_PARTY_CREATE_FAILURE,
    TAXI_PARTY_LIST_RESTART_REQUEST,
    TAXI_PARTY_LIST_RESTART_SUCCESS,
    TAXI_PARTY_LIST_RESTART_FAILURE,
    TAXI_TO_CHAT_INFO_MODAL_REQUEST,
    TAXI_TO_CHAT_INFO_MODAL_SUCCESS,
    TAXI_TO_CHAT_INFO_MODAL_FAILURE,
} from '../../constants';
import {
    getMyTaxiPartiesApi,
    deleteTaxiPartyApi,
    getTaxiPlaceListApi,
    getTaxiPartyListApi,
    createTaxiPartyApi,
} from '../../utils';

function* getTaxiParties() {
    const result = yield call(getMyTaxiPartiesApi);
    console.log('요청 이후 result', result);
    try {
        yield put({
            type: TAXI_LIST_FETCH_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: TAXI_LIST_FETCH_FAILURE,
            error: err,
        });
    }
}

function* deleteTaxiParty(action) {
    console.log('saga', action);
    const result = yield call(deleteTaxiPartyApi, action.id);
    console.log('요청 이후 result', result);
    try {
        yield put({
            type: TAXI_ROOM_DELETE_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: TAXI_ROOM_DELETE_FAILURE,
            error: err,
        });
    }
}

function* getTaxiPlaceList() {
    const result = yield call(getTaxiPlaceListApi);
    console.log('요청 이후 result', result);
    try {
        yield put({
            type: TAXI_PLACE_LIST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: TAXI_PLACE_LIST_FAILURE,
            error: err,
        });
    }
}

function* getTaxiPartyList(action) {
    const result = yield call(getTaxiPartyListApi, action.data);
    try {
        yield put({
            type: TAXI_PARTY_LIST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: TAXI_PARTY_LIST_FAILURE,
            error: err,
        });
    }
}

function* taxiCreateModal() {
    try {
        yield put({
            type: TAXI_CREATE_MODAL_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: TAXI_CREATE_MODAL_FAILURE,
            error: err,
        });
    }
}

function* taxiPageDate(action) {
    console.log('saga', action);
    try {
        yield put({
            type: TAXI_PAGE_DATE_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: TAXI_PAGE_DATE_FAILURE,
            error: err,
        });
    }
}

function* createTaxiParty(action) {
    const result = yield call(createTaxiPartyApi, action.data);
    console.log('saga 결과', result);
    try {
        yield put({
            type: TAXI_PARTY_CREATE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: TAXI_PARTY_CREATE_FAILURE,
            error: err,
        });
    }
}

function* taxiPartyRestart() {
    try {
        yield put({
            type: TAXI_PARTY_LIST_RESTART_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: TAXI_PARTY_LIST_RESTART_FAILURE,
            error: err,
        });
    }
}

function* taxiToChatModal(action) {
    console.log('saga', action);
    try {
        yield put({
            type: TAXI_TO_CHAT_INFO_MODAL_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: TAXI_TO_CHAT_INFO_MODAL_FAILURE,
            error: err,
        });
    }
}

function* watchTaxiPartyRestart() {
    yield takeLatest(TAXI_PARTY_LIST_RESTART_REQUEST, taxiPartyRestart);
}

function* watchTaxiPartiesList() {
    yield takeLatest(TAXI_LIST_FETCH_REQUEST, getTaxiParties);
}

function* watchDeleteTaxiParty() {
    yield takeLatest(TAXI_ROOM_DELETE_REQUEST, deleteTaxiParty);
}

function* watchGetTaxiPlace() {
    yield takeLatest(TAXI_PLACE_LIST_REQUEST, getTaxiPlaceList);
}

function* watchGetTaxiParty() {
    yield takeLatest(TAXI_PARTY_LIST_REQUEST, getTaxiPartyList);
}

function* watchCreateTaxiModal() {
    yield takeLatest(TAXI_CREATE_MODAL_REQUEST, taxiCreateModal);
}

function* watchTaxiPageDate() {
    yield takeLatest(TAXI_PAGE_DATE_REQUEST, taxiPageDate);
}

function* watchCreateTaxiParty() {
    yield takeLatest(TAXI_PARTY_CREATE_REQUEST, createTaxiParty);
}

function* watchTaxiToChatModal() {
    yield takeLatest(TAXI_TO_CHAT_INFO_MODAL_REQUEST, taxiToChatModal);
}

export default function* taxiSaga() {
    yield all([
        fork(watchTaxiPartiesList),
        fork(watchDeleteTaxiParty),
        fork(watchGetTaxiPlace),
        fork(watchGetTaxiParty),
        fork(watchCreateTaxiModal),
        fork(watchTaxiPageDate),
        fork(watchCreateTaxiParty),
        fork(watchTaxiPartyRestart),
        fork(watchTaxiToChatModal),
    ]);
}
