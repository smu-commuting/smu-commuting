/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
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

export const initialState = {
    // 리스트 목록
    lostItemList: [],
    lostItemEnd: false,
    lostItemListLoading: false,
    lostItemListDone: false,
    lostItemListError: null,
    // 분실물 단건 조회
    lostItemInfo: null,
    lostItemInfoLoading: false,
    lostItemInfoDone: false,
    lostItemInfoError: null,
    // 수정, 삭제 모달 클릭
    isClickDetailUpdateDeleteModal: false,
};

export const getLostItemList = data => {
    return {
        type: COMMUNITY_GET_LOST_ITEM_LIST_REQUEST,
        data,
    };
};

export const deleteLostItemList = () => {
    return {
        type: COMMUNITY_LIST_DELETE_REQUEST,
    };
};

export const getLostItemDetailInfo = id => {
    return {
        type: COMMUNITY_GET_DETAIL_INFO_REQUEST,
        id,
    };
};

export const isClickDetailUpdateDeleteModal = () => {
    return {
        type: COMMUNITY_CLICK_DETAIL_UD_MODAL_REQUEST,
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
                draft.lostItemEnd = action.data.length !== 10;
                break;
            case COMMUNITY_GET_LOST_ITEM_LIST_FAILURE:
                draft.lostItemListLoading = false;
                draft.lostItemListError = action.data;
                break;
            case COMMUNITY_LIST_DELETE_REQUEST:
                break;
            case COMMUNITY_LIST_DELETE_SUCCESS:
                draft.lostItemList = [];
                break;
            case COMMUNITY_LIST_DELETE_FAILURE:
                break;
            case COMMUNITY_GET_DETAIL_INFO_REQUEST:
                draft.lostItemInfoLoading = true;
                draft.lostItemInfoDone = false;
                draft.lostItemInfoError = false;
                break;
            case COMMUNITY_GET_DETAIL_INFO_SUCCESS:
                draft.lostItemInfoLoading = false;
                draft.lostItemInfoDone = true;
                draft.lostItemInfo = action.data;
                break;
            case COMMUNITY_GET_DETAIL_INFO_FAILURE:
                draft.lostItemInfoLoading = false;
                draft.lostItemInfoError = action.error;
                break;
            case COMMUNITY_CLICK_DETAIL_UD_MODAL_REQUEST:
                break;
            case COMMUNITY_CLICK_DETAIL_UD_MODAL_SUCCESS:
                draft.isClickDetailUpdateDeleteModal =
                    !draft.isClickDetailUpdateDeleteModal;
                break;
            case COMMUNITY_CLICK_DETAIL_UD_MODAL_FAILURE:
                break;
            default:
                break;
        }
    });
};

export default reducer;
