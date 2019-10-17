import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import productReducers from './productReducers';
import settingReducers from './settingReducers';
import favoriteReducers from './favoriteReducers';
import downloadReducers from './downloadReducers';
export default combineReducers({
    loginReducer,
    productReducers,
    settingReducers,
    favoriteReducers,
    downloadReducers
})
