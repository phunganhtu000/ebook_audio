import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {
    getDataOfflineMode,
    setHeight,
    setWidth
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {
    horizontalView, marginComponent,

} from '../../../cores/styles/styleView';
import {ifIphoneX} from "react-native-iphone-x-helper";

const {width} = Dimensions.get('window');
export default class styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#F3F6F5',
            },
            body: {
                paddingHorizontal: setWidth('2%'),
                marginTop: setWidth('2%'),
            },
            viewflatl: {
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: 'silver',
                borderBottomWidth: 0.5,
                height: 65,

            },
            textname: {
                fontSize: 20,
                marginRight: 10
            },
            textname2: {
                fontSize: 20,
            },
            iconheart: {
                fontSize: 30,
                color: 'silver',
                position: 'absolute',
                right: 0
            },
            fooder: {
                backgroundColor: '#232830',
                ...
                    ifIphoneX({
                        height: 60,
                        paddingLeft: 10,
                        paddingRight: 10
                    }, {
                        height: 60,
                        paddingLeft: 10,
                        paddingRight: 10
                    }),
                width: '100%',
                ...horizontalView,
            },
            iconplay: {
                color: "#fff",
                fontSize: 40
            },
            iconplay1: {
                color: "#fff",
                fontSize: 25,
                ...
                    ifIphoneX({
                        marginLeft: 40
                    }, {
                        marginLeft: 20
                    }),
            },
            iconbar: {
                color: "#fff",
                fontSize: 30,
                ...
                    ifIphoneX({
                        marginRight: 40
                    }, {
                        marginRight: 20
                    }),
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
            viewplay: {
                backgroundColor: colors.red,
                ...
                    ifIphoneX({
                        height: setHeight('7%')
                    }, {
                        height: setHeight('8%')
                    }),

            },
            imageview: {height: 100, width: '100%',
                //  transform: [{scaleX: isRTL ? -1 : 1}]
            },

        });
    }
}
