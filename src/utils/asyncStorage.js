import AsyncStorage  from '@react-native-community/async-storage';
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
export const saveProfile = async (language) => {
    await AsyncStorage.setItem('@profile', JSON.stringify(language));

};
export const getProfile = async () => {
    let value = '';
    try {
        const value = await AsyncStorage.getItem('@profile');
        if (value !== null) {
            return JSON.parse(value);
        }
        return value;
    } catch (error) {
        return value;
    }
};
