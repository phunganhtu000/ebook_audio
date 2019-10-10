import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import productReducers from './productReducers';
import settingReducers from './settingReducers';
export default combineReducers({
    loginReducer,
    productReducers,
    settingReducers,
})
