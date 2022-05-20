/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import produce from 'immer';
import {
    BUS_INFO_MODAL_OPEN,
    BUS_INFO_MODAL_OPEN_SUCCESS,
    BUS_INFO_MODAL_OPEN_FAILURE,
    BUS_INFO_MODAL_FETCH_REQUEST,
    BUS_INFO_MODAL_FETCH_SUCCESS,
    BUS_INFO_MODAL_FETCH_FAILURE,
} from '../../constants';

export const initialState = {
    isBusInfoModalOpen: false,
};

export const isBusInfoModalClick = () => {
    return {
        type: BUS_INFO_MODAL_OPEN,
    };
};

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case BUS_INFO_MODAL_OPEN:
                break;
            case BUS_INFO_MODAL_OPEN_SUCCESS:
                draft.isBusInfoModalOpen = !draft.isBusInfoModalOpen;
                break;
            case BUS_INFO_MODAL_OPEN_FAILURE:
                draft.isBusModalOpen = false;
                break;
            default:
                break;
        }
    });
};

export default reducer;
