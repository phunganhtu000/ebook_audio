
import { AsyncStorage } from 'react-native';

const getRTL = async () => {
    try {
        const value = await AsyncStorage.getItem('@rtl');
        if (value !== null) {
            return value;
        }else{
            console.log(value)
            return 'error';
        }
    } catch (error) {
        // Error retrieving data
        console.log(error)
        return 'loi';
    }
};

export default getRTL;

