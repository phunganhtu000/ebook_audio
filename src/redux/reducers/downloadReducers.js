import * as types from '../actions/actionTypes';
import InitialState from './InitialState';

export default function (state = InitialState.download, action) {
    switch (action.type) {

        case types.ADD_TO_DOWNLOAD_SUCCESS:
            let exists = false;
            const newState = state.map(item => {
                if (item.id === action.item.id) {
                    exists = true;
                    return {
                        ...item,
                        quantity: item.quantity + action.item.quantity,
                    };
                } else {
                    return item;
                }
            });
            if (exists) {
                return newState;
            } else {
                return [
                    ...state,
                    action.item,
                ];
            }
        case types.GET_DOWNLOAD_SUCCESS:
            return state,
                action.download;
        case types.REMOVE_FROM_DOWNLOAD_SUCCESS:
            const remaingList = [
                ...state.filter(i => i.id !== action.item.id),
            ];
            return remaingList;
        default:
            return state;
    }
}
