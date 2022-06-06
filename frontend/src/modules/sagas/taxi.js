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
} from '../../constants';
import {
    getMyTaxiPartiesApi,
    deleteTaxiPartyApi,
    getTaxiPlaceListApi,
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

function* watchTaxiPartiesList() {
    yield takeLatest(TAXI_LIST_FETCH_REQUEST, getTaxiParties);
}

function* watchDeleteTaxiParty() {
    yield takeLatest(TAXI_ROOM_DELETE_REQUEST, deleteTaxiParty);
}

function* watchGetTaxiPlace() {
    yield takeLatest(TAXI_PLACE_LIST_REQUEST, getTaxiPlaceList);
}

export default function* chatSaga() {
    yield all([
        fork(watchTaxiPartiesList),
        fork(watchDeleteTaxiParty),
        fork(watchGetTaxiPlace),
    ]);
}
