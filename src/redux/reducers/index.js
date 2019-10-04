import {combineReducers} from 'redux';
import settingReducers from './settingReducers'
import productReducers from './productReducers'
export default combineReducers({
    productReducers,
    settingReducers,
});
