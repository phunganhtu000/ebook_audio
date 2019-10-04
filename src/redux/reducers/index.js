import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import settingReducers from './settingReducers'
import productReducers from './productReducers'
export default combineReducers({
    productReducers,
    settingReducers,
});
