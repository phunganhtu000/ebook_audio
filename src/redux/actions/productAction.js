import * as types from './actionTypes';
import axios from 'axios';
import Constant from '../../utils/Constant_Api';

//home
export function getDataHome() {
    const url = `${Constant.url}${Constant.home}`;
    return (dispatch) => {
        dispatch(dataHome());
        axios.get(url).then(function (response) {
            // console.log('dataJson: ' + JSON.stringify(response.data));
            return (dispatch(dataHomeSuccess(response.data.EBOOK_APP)));
        }).catch(err => dispatch(dataHomeFailure(err)));
    };
}

function dataHome() {
    return {
        type: types.GET_DATA_HOME,
    };
}

function dataHomeSuccess(data) {
    // console.log('dataJson: ' + JSON.stringify(data));
    return {
        type: types.GET_DATA_HOME_SUCCESS,
        data,
    };
}

function dataHomeFailure() {
    return {
        type: types.GET_DATA_HOME_FAILUSE,
    };
}

export const getDetail = (id) => {

    const url = `${Constant.url}${Constant.detail}${id}`;
    console.log('url detail: ' + url);
    return (dispatch) => {
        dispatch(dataDetail());
        axios.get(url).then(function (response) {
            return (dispatch(dataDetailSuccess(response.data)));
        }).catch(err => dispatch(dataDetailFailure(err)));
    };
};

function dataDetail() {
    return {
        type: types.GET_DATA_DETAIL,
    };
}

function dataDetailSuccess(data) {
    return {
        type: types.GET_DATA_DETAIL_SUCCESS,
        data,
    };
}

function dataDetailFailure() {
    return {
        type: types.GET_DATA_DETAIL_FAILUSE,
    };
}
