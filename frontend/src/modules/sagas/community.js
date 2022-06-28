import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    COMMUNITY_GET_LOST_ITEM_LIST_REQUEST,
    COMMUNITY_GET_LOST_ITEM_LIST_SUCCESS,
    COMMUNITY_GET_LOST_ITEM_LIST_FAILURE,
} from '../../constants';
import { getLostItemListApi } from '../../utils/communityApi';

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

function* watchGetLostItemList() {
    yield takeLatest(COMMUNITY_GET_LOST_ITEM_LIST_REQUEST, getLostItemList);
}

export default function* communitySaga() {
    yield all([fork(watchGetLostItemList)]);
}
