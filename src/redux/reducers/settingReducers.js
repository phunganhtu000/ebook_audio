import * as types from '../actions/actionTypes';
const initialState = {
    getLang:'',
    currentValue: false,
    languages:'',

};

export default function (state = initialState, action)  {
    switch(action.type) {
        case types.SWITCH:
            return {
                currentValue: action.currentValue
            };
        case types.LANGUAGE:
            return {
                ...state,
                languages: action.payload
            }
        case types.GET_LANGUAGE:
            return {
                ...state,
                getLang:action.payload
            }
        default:
            return state;
    }
};
