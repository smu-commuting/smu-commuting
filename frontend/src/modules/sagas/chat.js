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
    CHAT_ROOM_CHANGE_MAXIMUM_REQUEST,
    CHAT_ROOM_CHANGE_MAXIMUM_SUCCESS,
    CHAT_ROOM_CHANGE_MAXIMUM_FAILURE,
    CHAT_ROOM_HEADER_INFO_REQUEST,
    CHAT_ROOM_HEADER_INFO_SUCCESS,
    CHAT_ROOM_HEADER_INFO_FAILURE,
    CHAT_BUS_ROOM_MESSAGE_REQUEST,
    CHAT_BUS_ROOM_MESSAGE_SUCCESS,
    CHAT_BUS_ROOM_MESSAGE_FAILURE,
    CHAT_BUS_ROOM_DELETE_MESSAGE_REQUEST,
    CHAT_BUS_ROOM_DELETE_MESSAGE_SUCCESS,
    CHAT_BUS_ROOM_DELETE_MESSAGE_FAILURE,
} from '../../constants';
import { getRoomMessage } from '../../utils';
import {
    getBusRoomMessageApi,
    getChatRoomHeaderInfoApi,
    getOutPeopleListApi,
    getPeopleListApi,
    updateChatRoomMaximunHeadApi,
} from '../../utils/chatApi';

function* chatMessageList(action) {
    try {
        const result = yield call(getRoomMessage, action.data);
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

function* getBusMessageList(action) {
    try {
        const result = yield call(getBusRoomMessageApi, action.data);
        yield put({
            type: CHAT_BUS_ROOM_MESSAGE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: CHAT_BUS_ROOM_MESSAGE_FAILURE,
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
function* changeMaximum(action) {
    try {
        const result = yield call(updateChatRoomMaximunHeadApi, action.data);
        yield put({
            type: CHAT_ROOM_CHANGE_MAXIMUM_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_CHANGE_MAXIMUM_FAILURE,
        });
    }
}
function* getChatRoomHeaderInfo(action) {
    try {
        const result = yield call(getChatRoomHeaderInfoApi, action.id);
        yield put({
            type: CHAT_ROOM_HEADER_INFO_SUCCESS,
            data: result.data.data,
        });
    } catch (err) {
        yield put({
            type: CHAT_ROOM_HEADER_INFO_FAILURE,
        });
    }
}
function* deleteBusChatMessageList() {
    try {
        yield put({
            type: CHAT_BUS_ROOM_DELETE_MESSAGE_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: CHAT_BUS_ROOM_DELETE_MESSAGE_FAILURE,
            error: '채팅방 삭제 실패',
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
function* watchChangeMaximum() {
    yield takeLatest(CHAT_ROOM_CHANGE_MAXIMUM_REQUEST, changeMaximum);
}
function* watchGetChatRoomHeaderInfo() {
    yield takeLatest(CHAT_ROOM_HEADER_INFO_REQUEST, getChatRoomHeaderInfo);
}
function* watchGetBusMessageList() {
    yield takeLatest(CHAT_BUS_ROOM_MESSAGE_REQUEST, getBusMessageList);
}
function* watchDeleteBusMessageList() {
    yield takeLatest(
        CHAT_BUS_ROOM_DELETE_MESSAGE_REQUEST,
        deleteBusChatMessageList,
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
        fork(watchChangeMaximum),
        fork(watchGetChatRoomHeaderInfo),
        fork(watchGetBusMessageList),
        fork(watchDeleteBusMessageList),
    ]);
}
