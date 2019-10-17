import * as types from './actionTypes';
import {saveFavorite, getFavorites} from '../../utils/asyncStorage';

const getFavorite = (favorite) => {
    return {
        type: types.GET_FAVORITE_SUCCESS,
        favorite,
    };
};

export function addToFavorite(product, quantity) {
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
            type: types.ADD_TO_FAVORITE_SUCCESS,
            item,
        });
        let favorites = state().favoriteReducers;
        await saveFavorite(favorites);
        console.log('favorites: ' + JSON.stringify(favorites));
    };
}

export function removeFavorite(item) {
    return async (dispatch, getState) => {
        const state = getState;
        dispatch({
            type: types.REMOVE_FROM_FAVORITE_SUCCESS,
            item,
        });
        let favorites = state().favoriteReducers;
        await saveFavorite(favorites);
    };
}

export function getDataFavorite() {
    return (dispatch) => {
        getFavorites().then(favorite => {
            dispatch(getFavorite(favorite));
        });
    };
}
