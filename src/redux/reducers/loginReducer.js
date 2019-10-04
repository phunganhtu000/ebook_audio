import * as types from '../actions/actionTypes';

const loginState = {
    login:[]
};
export default function (state = loginState, action) {
    // console.log("testFirebaseInRedux: action" + JSON.stringify(action.payload));
    switch (action.type) {
        case types.CHECK_LOGIN:
            return {
                ...state,
                login:action.payload
            };

        default:
            return state
    }
}
