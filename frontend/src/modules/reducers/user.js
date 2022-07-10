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
};

export const loginRequest = data => {
    return {
        type: USER_LOG_IN_REQUEST,
        data,
    };
};

export const signupRequest = data => {
    console.log(data);
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

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case USER_LOG_IN_REQUEST:
                // console.log('Reducer LOG_IN_request', action.data);
                draft.loginLoading = true;
                draft.loginDone = false;
                draft.loginError = null;
                break;

            case USER_LOG_IN_SUCCESS:
                console.log('LOG_IN_SUCCESS', action.data);
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.loginError = null;
                draft.me = action.data.data;
                console.log(draft.me);
                break;

            case USER_LOG_IN_FAILURE:
                draft.loginLoading = false;
                draft.loginError = action.err;
                break;

            case USER_SIGN_UP_REQUEST:
                console.log('SIGN_UP_request', action.data);
                draft.signupLoading = true;
                draft.signupDone = false;
                draft.signupError = null;
                break;
            case USER_SIGN_UP_SUCCESS:
                console.log(action.data);
                draft.signupLoading = false;
                draft.signupDone = true;
                draft.signupError = null;
                draft.me = action.data;
                break;
            case USER_SIGN_UP_FAILURE:
                draft.signupLoading = false;
                draft.signupError = action.err;
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
                console.log('프로필 조회 성공 데이터', action.data);
                break;
            case USER_INFO_GET_FAILURE:
                draft.userProfileLoading = false;
                draft.userProfileError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;
