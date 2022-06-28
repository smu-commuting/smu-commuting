/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    COMMUNITY_GET_LOST_ITEM_LIST_REQUEST,
    COMMUNITY_GET_LOST_ITEM_LIST_SUCCESS,
    COMMUNITY_GET_LOST_ITEM_LIST_FAILURE,
} from '../../constants';

export const initialState = {
    lostItemList: [],
    lostItemListLoading: false,
    lostItemListDone: false,
    lostItemListError: null,
};

export const getLostItemList = data => {
    return {
        type: COMMUNITY_GET_LOST_ITEM_LIST_REQUEST,
        data,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case COMMUNITY_GET_LOST_ITEM_LIST_REQUEST:
                draft.lostItemListLoading = true;
                draft.lostItemListDone = false;
                draft.lostItemListError = null;
                break;
            case COMMUNITY_GET_LOST_ITEM_LIST_SUCCESS:
                draft.lostItemListLoading = false;
                draft.lostItemListDone = true;
                draft.lostItemList = action.data;
                break;
            case COMMUNITY_GET_LOST_ITEM_LIST_FAILURE:
                draft.lostItemListLoading = false;
                draft.lostItemListError = action.data;
                break;
            default:
                break;
        }
    });
};

export default reducer;
