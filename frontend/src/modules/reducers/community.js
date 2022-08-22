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
    COMMUNITY_DELETE_CONFIRM_MODAL_REQUEST,
    COMMUNITY_DELETE_CONFIRM_MODAL_SUCCESS,
    COMMUNITY_DELETE_CONFIRM_MODAL_FAILURE,
    COMMINITY_DETAIL_PAGE_DELETE_REQUEST,
    COMMINITY_DETAIL_PAGE_DELETE_SUCCESS,
    COMMINITY_DETAIL_PAGE_DELETE_FAILURE,
    COMMUNITY_REPLY_POST_REQUEST,
    COMMUNITY_REPLY_POST_SUCCESS,
    COMMUNITY_REPLY_POST_FAILURE,
    COMMUNITY_GET_REPLY_LIST_REQUEST,
    COMMUNITY_GET_REPLY_LIST_SUCCESS,
    COMMUNITY_GET_REPLY_LIST_FAILURE,
    COMMUNITY_REPLY_UPDATE_DELETE_MODAL_REQUEST,
    COMMUNITY_REPLY_UPDATE_DELETE_MODAL_SUCCESS,
    COMMUNITY_REPLY_UPDATE_DELETE_MODAL_FAILURE,
    COMMUNITY_REPLY_DELETE_CONFIRM_MODAL_REQUEST,
    COMMUNITY_REPLY_DELETE_CONFIRM_MODAL_SUCCESS,
    COMMUNITY_REPLY_DELETE_CONFIRM_MODAL_FAILURE,
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
    // 삭제 확인 모달 띄우기
    isDeleteConfirmModal: false,
    // 분실물 삭제
    lostItemInfoDeleteLoading: false,
    lostItemInfoDeleteDone: false,
    lostItemInfoDeleteError: null,
    // 댓글 생성
    replyPostLoading: false,
    replyPostDone: false,
    replyPostError: null,
    // 댓글 목록 조회
    replyList: [],
    replyListLoading: false,
    replyListDone: false,
    replyListError: null,
    // 댓글 수정/삭제 모달
    isReplyDetailUpdateDeleteModal: false,
    clickReplyContent: null,
    // 삭제 확인 모달
    isReplyDeleteConfirmModal: false,
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
export const deleteConfirmModal = () => {
    return {
        type: COMMUNITY_DELETE_CONFIRM_MODAL_REQUEST,
    };
};

export const deleteLostItemDetailInfo = id => {
    return {
        type: COMMINITY_DETAIL_PAGE_DELETE_REQUEST,
        id,
    };
};

export const postReply = dataObject => {
    return {
        type: COMMUNITY_REPLY_POST_REQUEST,
        id: dataObject.id,
        data: dataObject.reply,
    };
};

export const getReplyList = id => {
    return {
        type: COMMUNITY_GET_REPLY_LIST_REQUEST,
        id,
    };
};

export const replyModalClick = data => {
    return {
        type: COMMUNITY_REPLY_UPDATE_DELETE_MODAL_REQUEST,
        data,
    };
};

export const replyDeleteConfirmModal = () => {
    return {
        type: COMMUNITY_REPLY_DELETE_CONFIRM_MODAL_REQUEST,
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
            case COMMUNITY_DELETE_CONFIRM_MODAL_REQUEST:
                draft.isClickDetailUpdateDeleteModal = false;
                break;
            case COMMUNITY_DELETE_CONFIRM_MODAL_SUCCESS:
                draft.isDeleteConfirmModal = !draft.isDeleteConfirmModal;
                break;
            case COMMUNITY_DELETE_CONFIRM_MODAL_FAILURE:
                break;
            case COMMINITY_DETAIL_PAGE_DELETE_REQUEST:
                draft.lostItemInfoDeleteLoading = true;
                draft.lostItemInfoDeleteDone = false;
                draft.lostItemInfoDeleteError = null;
                break;
            case COMMINITY_DETAIL_PAGE_DELETE_SUCCESS:
                draft.lostItemInfoDeleteLoading = false;
                draft.lostItemInfoDeleteDone = true;
                break;
            case COMMINITY_DETAIL_PAGE_DELETE_FAILURE:
                draft.lostItemInfoDeleteLoading = false;
                draft.lostItemInfoDeleteError = action.error;
                break;
            case COMMUNITY_REPLY_POST_REQUEST:
                draft.replyPostLoading = true;
                draft.replyPostDone = false;
                draft.replyPostError = null;
                break;
            case COMMUNITY_REPLY_POST_SUCCESS:
                draft.replyPostLoading = false;
                draft.replyPostDone = true;
                break;
            case COMMUNITY_REPLY_POST_FAILURE:
                draft.replyPostLoading = false;
                draft.replyPostError = action.error;
                break;
            case COMMUNITY_GET_REPLY_LIST_REQUEST:
                draft.replyListLoading = true;
                draft.replyListDone = false;
                draft.replyListError = null;
                break;
            case COMMUNITY_GET_REPLY_LIST_SUCCESS:
                draft.replyListLoading = false;
                draft.replyListDone = true;
                draft.replyList = action.data;
                break;
            case COMMUNITY_GET_REPLY_LIST_FAILURE:
                draft.replyListLoading = false;
                draft.replyListError = action.error;
                break;
            case COMMUNITY_REPLY_UPDATE_DELETE_MODAL_REQUEST:
                break;
            case COMMUNITY_REPLY_UPDATE_DELETE_MODAL_SUCCESS:
                draft.isReplyDetailUpdateDeleteModal =
                    !draft.isReplyDetailUpdateDeleteModal;
                draft.clickReplyContent = action.data;
                break;
            case COMMUNITY_REPLY_UPDATE_DELETE_MODAL_FAILURE:
                break;
            case COMMUNITY_REPLY_DELETE_CONFIRM_MODAL_REQUEST:
                break;
            case COMMUNITY_REPLY_DELETE_CONFIRM_MODAL_SUCCESS:
                draft.isReplyDeleteConfirmModal =
                    !draft.isReplyDeleteConfirmModal;
                break;
            case COMMUNITY_REPLY_DELETE_CONFIRM_MODAL_FAILURE:
                break;
            default:
                break;
        }
    });
};

export default reducer;
