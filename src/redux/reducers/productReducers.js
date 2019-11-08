import * as types from '../actions/actionTypes';

const initialState = {
    search: [],
    latest: [],
    author: [],
    sub_category: [],
    gethome: [],
    detail: [],
    category: [],
    isFetching: false,
    comment: [],
    rate: [],
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
        case types.GET_SUB_CATEGORY:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_SUB_CATEGORY_SUCCESS:
            return {
                ...state,
                isFetching: true,
                sub_category: action.data,
            };
        case  types.GET_DATA_SUB_CATEGORY_FAILUSE:
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
                author: action.data,
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
                latest: action.data,
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


        case types.GET_DATA_COMMENT:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_COMMENT_SUCCESS:
            return {
                ...state,
                isFetching: true,
                comment: action.data,
            };
        case  types.GET_DATA_COMMENT_FAILUSE:
            return {
                ...state,
                isFetching: false,
            };

        case types.GET_DATA_RATE:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_RATE_SUCCESS:
            return {
                ...state,
                isFetching: true,
                rate: action.data,
            };
        case  types.GET_DATA_RATE_FAILUSE:
            return {
                ...state,
                isFetching: false,
            };






        case types.GET_DATA_SEARCH:
            return {
                ...state,
                isFetching: true,
            };
        case types.GET_DATA_SEARCH_SUCCESS:
            return {
                ...state,
                isFetching: true,
                search: action.data,
            };
        case  types.GET_DATA_SEARCH_FAILUSE:
            return {
                ...state,
                isFetching: false,
            };


        default:
            return state;
    }
}
