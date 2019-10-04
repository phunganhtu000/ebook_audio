import {StyleSheet, Dimensions, Platform} from 'react-native';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            footer: {
                backgroundColor: "#fff",
                paddingTop: 0,
                bottom: 0,
                ...Platform.select({
                    ios: {
                        height: 64,
                    },
                    android: {
                        height: 54,
                    },
                }),
                right: 0,
                left: 0,
                borderTopWidth: 1,
                borderTopColor: "#bcbcbc",
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            },
            slider: {
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
               // flexDirection: 'row',
              //  flexDirection: isRTL ? 'row-reverse' : 'row',
                flex: 1,
                marginLeft: 50,
                marginRight: 50,
                transform: [{scaleX: isRTL ? -1 : 1}],
            }
        });
    }
}
