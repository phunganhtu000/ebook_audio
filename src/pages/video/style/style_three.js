import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {marginComponent,
} from '../../../cores/styles/styleView';

import {shadowComponent} from '../../../cores/viewComponents/shadow/Shadow';

const {width} = Dimensions.get('window');
export default class styles_three {
    static getSheet(isRTL) {
        return StyleSheet.create({
            containerList: {
                flex: 1,
                backgroundColor: '#fff',
            },
            viewMagin10: {
                marginLeft: 10,
                marginRight: 10
            },
            controls: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                height: 48,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-between',
                paddingHorizontal: 5


            },
            mainButtom: {
                marginRight: 15,
            },
            duration: {
                color: "#FFF",
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
                ...marginComponent
            },
            touchall: {
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
                height: 150,
                margin: 5,
                backgroundColor: colors.lightGray,
                paddingHorizontal: 5,
                borderRadius: 10,
                ...shadowComponent,
            },
            imageview: {height: 100, width: '100%',
                //  transform: [{scaleX: isRTL ? -1 : 1}]
            },
        });
    }
}
