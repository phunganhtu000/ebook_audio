import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import productReducers from "./productReducers";

export default combineReducers({
    loginReducer,productReducers
})
