/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    USER_LOG_IN_FAILURE,
    USER_LOG_IN_REQUEST,
    USER_LOG_IN_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_SIGN_UP_REQUEST,
    USER_SIGN_UP_SUCCESS,
    USER_BUS_MODAL,
    USER_BUS_MODAL_SUCCESS,
    USER_BUS_MODAL_FAILURE,
    USER_TAXI_MODAL,
    USER_TAXI_MODAL_SUCCESS,
    USER_TAXI_MODAL_FAILURE,
    USER_COMMUNITY_MODAL,
    USER_COMMUNITY_MODAL_SUCCESS,
    USER_COMMUNITY_MODAL_FAILURE,
    USER_INFO_GET_REQUEST,
    USER_INFO_GET_SUCCESS,
    USER_INFO_GET_FAILURE,
    USER_GET_PROFILE_IMG_LIST_REQUEST,
    USER_GET_PROFILE_IMG_LIST_SUCCESS,
    USER_GET_PROFILE_IMG_LIST_FAILURE,
    USER_GET_BLOCKED_LIST_REQUEST,
    USER_GET_BLOCKED_LIST_SUCCESS,
    USER_GET_BLOCKED_LIST_FAILURE,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
} from '../../constants';

export const initialState = {
    me: null,

    // 로그인 관련 상태 state
    loginLoading: false, // 로그인 시도중
    loginDone: false,
    loginError: null,

    // 회원가입 관련 상태 state
    signupLoading: false,
    signupDone: false,
    signupError: null,

    isBusModalOpen: false,
    isTaxiModalOpen: false,
    isCommunityModalOpen: false,

    userProfile: null,
    userProfileLoding: false,
    userProfileDone: false,
    userProfileError: null,

    profileImgList: null,
    profileImgListLoading: false,
    profileImgListDone: false,
    profileImgListError: null,

    blockedUserList: [],
    blockedUserListLoading: false,
    blockedUserListDone: false,
    blockedUserListFalse: null,
};

export const loginRequest = data => {
    return {
        type: USER_LOG_IN_REQUEST,
        data,
    };
};

export const signupRequest = data => {
    return {
        type: USER_SIGN_UP_REQUEST,
        data,
    };
};

export const busModalClick = () => {
    return {
        type: USER_BUS_MODAL,
    };
};

export const taxiModalClick = () => {
    return {
        type: USER_TAXI_MODAL,
    };
};

export const communityModalClick = () => {
    return {
        type: USER_COMMUNITY_MODAL,
    };
};

export const getUserInfo = () => {
    return {
        type: USER_INFO_GET_REQUEST,
    };
};

export const getProfileImgList = () => {
    return {
        type: USER_GET_PROFILE_IMG_LIST_REQUEST,
    };
};

export const getBlockedUserList = () => {
    return {
        type: USER_GET_BLOCKED_LIST_REQUEST,
    };
};

export const logOut = () => {
    return {
        type: USER_LOGOUT_REQUEST,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case USER_LOG_IN_REQUEST:
                draft.loginLoading = true;
                draft.loginDone = false;
                draft.loginError = null;
                break;

            case USER_LOG_IN_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.loginError = null;
                draft.me = action.data.data;
                break;

            case USER_LOG_IN_FAILURE:
                draft.loginLoading = false;
                draft.loginError = action.err;
                break;
            case USER_LOGOUT_REQUEST:
                break;
            case USER_LOGOUT_SUCCESS:
                draft.me = null;
                break;
            case USER_LOGOUT_FAILURE:
                break;
            case USER_SIGN_UP_REQUEST:
                break;
            case USER_SIGN_UP_SUCCESS:
                draft.me = action.data;
                break;
            case USER_SIGN_UP_FAILURE:
                break;
            case USER_BUS_MODAL:
                break;
            case USER_BUS_MODAL_SUCCESS:
                draft.isBusModalOpen = !draft.isBusModalOpen;
                break;
            case USER_BUS_MODAL_FAILURE:
                draft.isBusModalOpen = false;
                break;
            case USER_TAXI_MODAL:
                break;
            case USER_TAXI_MODAL_SUCCESS:
                draft.isTaxiModalOpen = !draft.isTaxiModalOpen;
                break;
            case USER_TAXI_MODAL_FAILURE:
                draft.isTaxiModalOpen = false;
                break;
            case USER_COMMUNITY_MODAL:
                break;
            case USER_COMMUNITY_MODAL_SUCCESS:
                draft.isCommunityModalOpen = !draft.isCommunityModalOpen;
                break;
            case USER_COMMUNITY_MODAL_FAILURE:
                draft.isCommunityModalOpen = false;
                break;
            case USER_INFO_GET_REQUEST:
                draft.userProfileLoding = true;
                draft.userProfileDone = false;
                draft.userProfileError = null;
                break;
            case USER_INFO_GET_SUCCESS:
                draft.userProfileLoading = false;
                draft.userProfileDone = true;
                draft.userProfile = action.data;
                break;
            case USER_INFO_GET_FAILURE:
                draft.userProfileLoading = false;
                draft.userProfileError = action.error;
                break;
            case USER_GET_PROFILE_IMG_LIST_REQUEST:
                draft.profileImgListLoading = true;
                draft.profileImgListDone = false;
                draft.profileImgListError = null;
                break;
            case USER_GET_PROFILE_IMG_LIST_SUCCESS:
                draft.profileImgListLoading = false;
                draft.profileImgListDone = true;
                draft.profileImgList = action.data.data;
                break;
            case USER_GET_PROFILE_IMG_LIST_FAILURE:
                draft.profileImgListLoading = false;
                draft.profileImgListError = action.error;
                break;
            case USER_GET_BLOCKED_LIST_REQUEST:
                draft.blockedUserListLoading = true;
                draft.blockedUserListDone = false;
                draft.blockedUserListError = null;
                break;
            case USER_GET_BLOCKED_LIST_SUCCESS:
                draft.blockedUserListLoading = false;
                draft.blockedUserListDone = true;
                draft.blockedUserList = action.data;
                break;
            case USER_GET_BLOCKED_LIST_FAILURE:
                draft.blockedUserListLoading = false;
                draft.blockedUserListError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;
