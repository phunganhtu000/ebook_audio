import * as types from './actionTypes';
import {saveDownload, getDownloads} from '../../utils/asyncStorage';

const getDownload = (download) => {
    // console.log('getcart: ' + JSON.stringify(download));
    return {
        type: types.GET_DOWNLOAD_SUCCESS,
        download,
    };
};

export function addToDownload(product, quantity) {
    return async (dispatch, getState) => {
        const state = getState;
        const item = {
            'id': product.id,
            'name': product.book_title,
            'image': product.book_cover_img,
            'rate': product.rate_avg,
            'author': product.author_name,
            'category': product.category_name,
        };

        dispatch({
            type: types.ADD_TO_DOWNLOAD_SUCCESS,
            item,
        });
        let download = state().downloadReducers;
        await saveDownload(download);
        console.log('download action: ' + JSON.stringify(download));
    };
}

export function removeFromDownload(item) {
    console.log('remove: ' + JSON.stringify(item));
    return async (dispatch, getState) => {
        const state = getState;
        dispatch({
            type: types.REMOVE_FROM_DOWNLOAD_SUCCESS,
            item: item,
        });
        let download = state().downloadReducers;
        await saveDownload(download);
    };
}

export function getDataDownload() {
    return (dispatch) => {
        getDownloads().then(download => {
            dispatch(getDownload(download));
        });
    };
};
