import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {
    setWidth,
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {
    marginComponent,
} from '../../../cores/styles/styleView';

const {width} = Dimensions.get('window');
export default class styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            containerList: {
                flex: 1,
                backgroundColor: '#F3F6F5',
            },
            viewMagin10: {
                marginLeft: 10,
                marginRight: 10,
            },
            controls: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: 48,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 5,


            },
            mainButtom: {
                marginRight: 15,
            },
            duration: {
                color: '#FFF',
                marginLeft: 15,

            },
            dot: {
                backgroundColor: colors.red,
                width: 10,
                height: 10,
                borderRadius: 5,
                marginLeft: 10,

            },
            containerVideo: {
                flex: 1,
                backgroundColor: '#fff',
                width: setWidth('100%'),
            },
            body: {
                paddingHorizontal: setWidth('2%'),
                marginTop: setWidth('2%'),
            },
            touchall: {
                justifyContent: 'center',
                alignItems: 'center',
                width: setWidth('28%'),
                height: setWidth('40%'),
                margin: setWidth('2%'),
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingHorizontal:setWidth('2%')
                // ...shadowComponent,
            },
            imageview: {
                height: 100, width: '100%',
                //  transform: [{scaleX: isRTL ? -1 : 1}]
            },
        });
    }
}
