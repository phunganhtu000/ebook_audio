import * as types from './actionTypes';
import Language from '../../cores/languages/languages';
import {getlanguage, saveDarkMode, saveLanguage} from '../../utils/asyncStorage';


// export const darkMode = value => ({
//     type: types.SWITCH,
//     currentValue: value,
// });
export const darkMode = (value) => {
    return async (dispatch) => {
        await saveDarkMode(value);
        dispatch({
            type: types.SWITCH,
            currentValue: value,
        });
    };
};
export const selectLanguage = (val) => {
    console.log('val: ' + JSON.stringify(val));
    return async (dispatch) => {
        Language.setLanguage(val);
        await saveLanguage(val);
        dispatch({
            type: types.LANGUAGE,
            val,
        });
    };
};

export const getLanguage = () => {
    return (dispatch) => {
        getlanguage().then(lang => {
            Language.setLanguage(lang);
            dispatch(getlang(lang));
        });
    };
};
const getlang = (lang) => {
    return {
        type: types.GET_LANGUAGE,
        lang,
    };
};
