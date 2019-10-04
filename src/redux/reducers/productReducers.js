import * as types from '../actions/actionTypes';

const initialState = {
    gethome: [],
    detail: [],
    category: [],
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
                gethome: action.data,
            };
        case  types.GET_DATA_HOME_FAILUSE:
            return {
                ...state,
                isFetching: false,
            };
        case types.GET_CATEGORY:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_CATEGORY_SUCCESS:
            return {
                ...state,
                isFetching: true,
                category: action.data,
            };
        case  types.GET_DATA_CATEGORY_FAILUSE:
            return {
                ...state,
                isFetching: false,
            };
        case types.GET_AUTHOR:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_AUTHOR_SUCCESS:
            return {
                ...state,
                isFetching: true,
                category: action.data,
            };
        case  types.GET_DATA_AUTHOR_FAILUSE:
            return {
                ...state,
                isFetching: false,
            };
            case types.GET_LATEST:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_LATEST_SUCCESS:
            return {
                ...state,
                isFetching: true,
                category: action.data,
            };
        case  types.GET_DATA_LATEST_FAILUSE:
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
                detail: action.data,
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
