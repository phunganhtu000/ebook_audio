import * as types from '../actions/actionTypes';

const initialState = {
    gethome: [],
    detail:[],
    isFetching: false,
};
export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_DATA_HOME:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_HOME_SUCCESS:
            return {
                ...state,
                isFetching: true,
                gethome:action.data,
            };
        case  types.GET_DATA_HOME_FAILUSE:
            return {
                ...state,
                isFetching: false,
            };
        case types.GET_DATA_DETAIL:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: true,
                detail:action.data,
            };
        case  types.GET_DATA_DETAIL_FAILUSE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}
