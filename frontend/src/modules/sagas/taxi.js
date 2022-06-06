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
    TAXI_PARTY_CREATE_REQUEST,
    TAXI_PARTY_CREATE_SUCCESS,
    TAXI_PARTY_CREATE_FAILURE,
} from '../../constants';
import {
    getMyTaxiPartiesApi,
    deleteTaxiPartyApi,
    getTaxiPlaceListApi,
    getTaxiPartyListApi,
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
            type: TAXI_PARTY_CREATE_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: TAXI_PARTY_CREATE_FAILURE,
            error: err,
        });
    }
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
    yield takeLatest(TAXI_PARTY_CREATE_REQUEST, taxiCreateModal);
}

export default function* taxiSaga() {
    yield all([
        fork(watchTaxiPartiesList),
        fork(watchDeleteTaxiParty),
        fork(watchGetTaxiPlace),
        fork(watchGetTaxiParty),
        fork(watchCreateTaxiModal),
    ]);
}
