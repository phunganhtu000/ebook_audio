import {StyleSheet, Dimensions} from 'react-native';
import {setHeight, setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {colors} from '../../../cores/styles/colors';
import {shadowComponent} from '../../../cores/viewComponents/shadow/Shadow';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#EBEBEB',
            },
            theme: {
                width: '100%',
                height: '70%',
                marginTop: 5,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10
            },
            touch: {
                backgroundColor: colors.white,
                width: setWidth('42%'),
                height: setWidth('80%'),
                borderRadius: 10,
                marginBottom: 20,
                ...shadowComponent
            },
            text1: {fontWeight: 'bold', marginLeft: 10, marginTop: 5, color: colors.black, fontSize: 20,},
            text2: {marginLeft: 10, color: colors.black, fontSize: 17,},
            body: {
                width: '100%',
                flexWrap: 'wrap',
               // flexDirection: 'row',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                padding: 20,
                marginBottom: 50
            },
            body2: {
                width: '100%',
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 10
            }
        });
    }
}
