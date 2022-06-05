/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    BUS_INFO_MODAL_OPEN,
    BUS_INFO_MODAL_OPEN_SUCCESS,
    BUS_INFO_MODAL_OPEN_FAILURE,
    BUS_INFO_FETCH_REQUEST,
    BUS_INFO_FETCH_SUCCESS,
    BUS_INFO_FETCH_FAILURE,
} from '../../constants';

export const initialState = {
    isBusInfoModalOpen: false,
    isUserClickStationNumber: -1,
    busData: null,
    busDataLoading: false,
    busDataDone: false,
    busDataError: false,
};

export const isBusInfoModalClick = data => {
    return {
        type: BUS_INFO_MODAL_OPEN,
        data,
    };
};

export const isBusInfoFetch = data => {
    return {
        type: BUS_INFO_FETCH_REQUEST,
        data,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case BUS_INFO_MODAL_OPEN:
                break;
            case BUS_INFO_MODAL_OPEN_SUCCESS:
                draft.isBusInfoModalOpen = !draft.isBusInfoModalOpen;
                draft.isUserClickStationNumber = action.data;
                break;
            case BUS_INFO_MODAL_OPEN_FAILURE:
                draft.isBusModalOpen = false;
                break;
            case BUS_INFO_FETCH_REQUEST:
                draft.busDataLoading = true;
                draft.busDataDone = false;
                draft.busDataError = null;
                break;
            case BUS_INFO_FETCH_SUCCESS:
                draft.busDataLoading = false;
                draft.busDataDone = true;
                draft.busDataError = null;
                draft.busData = action.data;
                break;
            case BUS_INFO_FETCH_FAILURE:
                draft.busDataLoading = false;
                draft.busDataError = action.err;
                break;
            default:
                break;
        }
    });
};

export default reducer;
