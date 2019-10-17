import * as types from '../actions/actionTypes';
import InitialState from './InitialState';
export default function(state = InitialState.favorite, action) {
    switch (action.type) {
        case types.ADD_TO_FAVORITE_SUCCESS:
            let exists = false;
            const newState = state.map(item => {
                if (item.id === action.item.id) {
                    exists = true;
                    return {
                        ...item,
                        quantity: item.quantity + action.item.quantity,
                    }
                } else {
                    return item;
                }
            });
            if (exists) {
                return newState;
            } else {
                return [
                    ...state,
                    action.item
                ];
            }
        case types.GET_FAVORITE_SUCCESS:
            return state,
                action.favorite;
        case types.REMOVE_FROM_FAVORITE_SUCCESS:
            const remaingList = [
                ...state.filter(i => i.id !== action.item.id),
            ];
            return remaingList;
        default:
            return state;
    }
}
