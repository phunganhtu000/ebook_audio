
import { AsyncStorage } from 'react-native';
const saveRTL = async (value) => {
    try {
        await AsyncStorage.setItem('rtl', value);
        return 'Successful';
    } catch (e) {
        return e;
    }
};
export default saveRTL;
