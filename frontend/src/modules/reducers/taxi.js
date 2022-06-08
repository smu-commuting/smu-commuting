/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    TAXI_LIST_FETCH_REQUEST,
    TAXI_LIST_FETCH_SUCCESS,
    TAXI_LIST_FETCH_FAILURE,
    TAXI_ROOM_DELETE_REQUEST,
    TAXI_ROOM_DELETE_SUCCESS,
    TAXI_ROOM_DELETE_FAILURE,
} from '../../constants';

export const initialState = {
    myTaxiParties: null,
    // 채팅 리스트 로딩
    myTaxiPartiesLoading: false,
    myTaxiPartiesDone: false,
    myTaxiPartiesError: null,
    deleteTaxiPartyLoading: false,
    deleteTaxiPartyDone: false,
    deleteTaxiPartyError: null,
};

export const getMyTaxiParties = () => {
    return {
        type: TAXI_LIST_FETCH_REQUEST,
    };
};

export const deleteTaxiParty = id => {
    return {
        type: TAXI_ROOM_DELETE_REQUEST,
        id,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case TAXI_LIST_FETCH_REQUEST:
                draft.myTaxiPartiesLoading = true;
                draft.myTaxiPartiesDone = false;
                draft.myTaxiPartiesError = null;
                break;
            case TAXI_LIST_FETCH_SUCCESS:
                draft.myTaxiPartiesLoading = false;
                draft.myTaxiPartiesDone = true;
                draft.myTaxiPartiesError = null;
                draft.myTaxiParties = action.data.data;
                break;
            case TAXI_LIST_FETCH_FAILURE:
                draft.myTaxiPartiesLoading = false;
                draft.myTaxiPartiesError = action.err;
                break;
            case TAXI_ROOM_DELETE_REQUEST:
                draft.deleteTaxiPartyLoading = true;
                draft.deleteTaxiPartyDone = false;
                draft.deleteTaxiPartyError = null;
                break;
            case TAXI_ROOM_DELETE_SUCCESS:
                draft.deleteTaxiPartyLoading = false;
                draft.deleteTaxiPartyDone = true;
                draft.deleteTaxiPartyError = null;
                break;
            case TAXI_ROOM_DELETE_FAILURE:
                console.log(action.err);
                draft.deleteTaxiPartyLoading = false;
                draft.deleteTaxiPartyError = action.err;
                break;
            default:
                break;
        }
    });
};

export default reducer;
