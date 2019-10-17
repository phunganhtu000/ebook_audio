import AsyncStorage from '@react-native-community/async-storage';

export const saveLanguage = async (language) => {
    await AsyncStorage.setItem('@language', JSON.stringify(language));

};
export const getlanguage = async () => {
    let value = '';
    try {
        const value = await AsyncStorage.getItem('@language');
        if (value !== null) {
            return JSON.parse(value);
        }
        return value;
    } catch (error) {
        return value;
    }
};
export const saveDarkMode = async (theme) => {
    await AsyncStorage.setItem('@darkmode', JSON.stringify(theme));

};
export const getdarkmode = async () => {
    let value = '';
    try {
        const value = await AsyncStorage.getItem('@darkmode');
        if (value !== null) {
            return JSON.parse(value);
        }
        return value;
    } catch (error) {
        return value;
    }
};
export const saveFavorite = async (favorites) => {
    try {
        await AsyncStorage.setItem('@favorite', JSON.stringify(favorites));
    } catch (error) {
        return [];
    }
};
export const getFavorites = async () => {
    try {
        const value = await AsyncStorage.getItem('@favorite');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        return [];
    }
};
export const saveDownload = async (carts) => {
    try {
        await AsyncStorage.setItem('@cart', JSON.stringify(carts));
        console.log('asyc: ' + JSON.stringify(carts));
    } catch (error) {
        return [];
    }
};
export const getDownloads = async () => {
    try {
        const value = await AsyncStorage.getItem('@cart');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        return [];
    }
};
