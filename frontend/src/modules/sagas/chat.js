/* eslint-disable no-unused-vars */
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    CHAT_ROOM_MESSAGE_REQUEST,
    CHAT_ROOM_MESSAGE_SUCCESS,
    CHAT_ROOM_MESSAGE_FAILURE,
    CHAT_ROOM_DELETE_MESSAGE_REQUEST,
    CHAT_ROOM_DELETE_MESSAGE_SUCCESS,
    CHAT_ROOM_DELETE_MESSAGE_FAILURE,
    CHAT_ROOM_PEOPLE_LIST_MODAL_REQUEST,
    CHAT_ROOM_PEOPLE_LIST_MODAL_SUCCESS,
    CHAT_ROOM_PEOPLE_LIST_MODAL_FAILURE,
    CHAT_ROOM_GET_PEOPLE_LIST_REQUEST,
    CHAT_ROOM_GET_PEOPLE_LIST_SUCCESS,
    CHAT_ROOM_GET_PEOPLE_LIST_FAILURE,
    CHAT_ROOM_GET_OUT_PEOPLE_LIST_REQUEST,
    CHAT_ROOM_GET_OUT_PEOPLE_LIST_SUCCESS,
    CHAT_ROOM_GET_OUT_PEOPLE_LIST_FAILURE,
    CHAT_ROOM_CHANGE_MAXIMUM_MODAL_REQUEST,
    CHAT_ROOM_CHANGE_MAXIMUM_MODAL_SUCCESS,
    CHAT_ROOM_CHANGE_MAXIMUM_MODAL_FAILURE,
} from '../../constants';
import { getRoomMessage } from '../../utils';
import { getOutPeopleListApi, getPeopleListApi } from '../../utils/chatApi';

function* chatMessageList(action) {
    try {
        const result = yield call(getRoomMessage, action.data);
        console.log('채팅 요청 이후 result', result);
        yield put({
            type: CHAT_ROOM_MESSAGE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_MESSAGE_FAILURE,
            error: err,
        });
    }
}

function* deleteChatMessageList() {
    try {
        yield put({
            type: CHAT_ROOM_DELETE_MESSAGE_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_DELETE_MESSAGE_FAILURE,
            error: '채팅방 삭제 실패',
        });
    }
}

function* denialModalClick() {
    try {
        yield put({
            type: CHAT_ROOM_PEOPLE_LIST_MODAL_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_PEOPLE_LIST_MODAL_FAILURE,
        });
    }
}

function* getPeopleList(action) {
    try {
        const result = yield call(getPeopleListApi, action.id);
        console.log('채팅 요청 이후 result', result);
        yield put({
            type: CHAT_ROOM_GET_PEOPLE_LIST_SUCCESS,
            data: result.data.data,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_GET_PEOPLE_LIST_FAILURE,
            error: err,
        });
    }
}

function* getOutPeopleList(action) {
    try {
        const result = yield call(getOutPeopleListApi, action.id);
        console.log('채팅 요청 이후 result', result);
        yield put({
            type: CHAT_ROOM_GET_OUT_PEOPLE_LIST_SUCCESS,
            data: result.data.data,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_GET_OUT_PEOPLE_LIST_FAILURE,
            error: err,
        });
    }
}
function* changeMaximumModalClick() {
    try {
        yield put({
            type: CHAT_ROOM_CHANGE_MAXIMUM_MODAL_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_CHANGE_MAXIMUM_MODAL_FAILURE,
        });
    }
}

function* watchChatRoomMessage() {
    yield takeLatest(CHAT_ROOM_MESSAGE_REQUEST, chatMessageList);
}
function* watchDeleteChatRoomMessage() {
    yield takeLatest(CHAT_ROOM_DELETE_MESSAGE_REQUEST, deleteChatMessageList);
}
function* watchDenialModalClick() {
    yield takeLatest(CHAT_ROOM_PEOPLE_LIST_MODAL_REQUEST, denialModalClick);
}
function* watchGetPeopleList() {
    yield takeLatest(CHAT_ROOM_GET_PEOPLE_LIST_REQUEST, getPeopleList);
}
function* watchGetOutPeopleList() {
    yield takeLatest(CHAT_ROOM_GET_OUT_PEOPLE_LIST_REQUEST, getOutPeopleList);
}
function* watchChangeMaximumModalClick() {
    yield takeLatest(
        CHAT_ROOM_CHANGE_MAXIMUM_MODAL_REQUEST,
        changeMaximumModalClick,
    );
}
export default function* chatSaga() {
    yield all([
        fork(watchChatRoomMessage),
        fork(watchDeleteChatRoomMessage),
        fork(watchDenialModalClick),
        fork(watchGetPeopleList),
        fork(watchGetOutPeopleList),
        fork(watchChangeMaximumModalClick),
    ]);
}
