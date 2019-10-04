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
export function getAuthor() {
    const url = `${Constant.url}${Constant.author}`;
    return (dispatch) => {
        dispatch(dataAuthor());
        axios.get(url).then(function (response) {
            // console.log('dataJson: ' + JSON.stringify(response.data));
            return (dispatch(dataAuthorSuccess(response.data.EBOOK_APP)));
        }).catch(err => dispatch(dataAuthorFailure(err)));
    };
}

function dataAuthor() {
    return {
        type: types.GET_AUTHOR,
    };
}

function dataAuthorSuccess(data) {
    // console.log('dataJson: ' + JSON.stringify(data));
    return {
        type: types.GET_DATA_AUTHOR_SUCCESS,
        data,
    };
}
function dataAuthorFailure() {
    return {
        type: types.GET_DATA_AUTHOR_FAILUSE,
    };
}
export function getAuthorList() {
    const url = `${Constant.url}${Constant.author}`;
    return (dispatch) => {
        dispatch(dataAuthorList());
        axios.get(url).then(function (response) {
            // console.log('dataJson: ' + JSON.stringify(response.data));
            return (dispatch(dataAuthorListSuccess(response.data.EBOOK_APP)));
        }).catch(err => dispatch(dataAuthorListFailure(err)));
    };
}

function dataAuthorList() {
    return {
        type: types.GET_AUTHORLIST,
    };
}

function dataAuthorListSuccess(data) {
    // console.log('dataJson: ' + JSON.stringify(data));
    return {
        type: types.GET_DATA_AUTHORLIST_SUCCESS,
        data,
    };
}
function dataAuthorListFailure() {
    return {
        type: types.GET_DATA_AUTHORLIST_FAILUSE,
    };
}
export function getLatest() {
    const url = `${Constant.url}${Constant.latest}`;
    return (dispatch) => {
        dispatch(dataLatest());
        axios.get(url).then(function (response) {
            // console.log('dataJson: ' + JSON.stringify(response.data));
            return (dispatch(dataLatestSuccess(response.data.EBOOK_APP)));
        }).catch(err => dispatch(dataLatestFailure(err)));
    };
}

function dataLatest() {
    return {
        type: types.GET_LATEST,
    };
}

function dataLatestSuccess(data) {
    // console.log('dataJson: ' + JSON.stringify(data));
    return {
        type: types.GET_DATA_LATEST_SUCCESS,
        data,
    };
}
function dataLatestFailure() {
    return {
        type: types.GET_DATA_LATEST_FAILUSE,
    };
}
export function getCategory() {
    const url = `${Constant.url}${Constant.category}`;
    return (dispatch) => {
        dispatch(dataCategory());
        axios.get(url).then(function (response) {
            // console.log('dataJson: ' + JSON.stringify(response.data));
            return (dispatch(dataCategorySuccess(response.data.EBOOK_APP)));
        }).catch(err => dispatch(dataCategoryFailure(err)));
    };
}
function dataCategory() {
    return {
        type: types.GET_CATEGORY,
    };
}
function dataCategorySuccess(data) {
    // console.log('dataJson: ' + JSON.stringify(data));
    return {
        type: types.GET_DATA_CATEGORY_SUCCESS,
        data,
    };
}
function dataCategoryFailure() {
    return {
        type: types.GET_DATA_CATEGORY_FAILUSE,
    };
}


export const getDetail = (id) => {

    const url = `${Constant.url}${Constant.detail}${id}`;
    console.log('url detail: ' + url);
    return (dispatch) => {
        dispatch(dataDetail());
        axios.get(url).then(function (response) {
            return (dispatch(dataDetailSuccess(response.data.EBOOK_APP)));
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
