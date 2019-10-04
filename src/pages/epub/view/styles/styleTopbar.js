import {StyleSheet, Dimensions, Platform} from 'react-native';


export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            title: {
                // textAlign: 'center',
                textAlign: isRTL ? 'right' : 'left',
                fontSize: 22,
                fontWeight: '400',
                flex: 8,
                color: '#000',
                ...Platform.select({
                    ios: {
                        fontFamily: "Baskerville",
                    },
                    android: {
                        fontFamily: "serif"
                    },
                }),
            },
            header: {
                backgroundColor: "#ffffff",
                ...Platform.select({
                    ios: {
                        paddingTop: 40,
                    },
                    android: {
                        paddingTop: 24,
                    },
                }),
                top: 0,
                ...Platform.select({
                    ios: {
                        height: 84,
                    },
                    android: {
                        height: 74,
                    },
                }),
                right: 0,
                left: 0,
                borderBottomWidth: 1,
                borderBottomColor:"#bcbcbc",
                position: 'absolute',
                display: 'flex',
                alignItems:'center',
                justifyContent:'center',
                //flexDirection: 'row',
                flex: 14,
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            backButton: {
                transform: [{scaleX: isRTL ? -1 : 1}],
                margin: 5,
                flex: 1,
                display: 'flex',
                alignItems:'center',
                justifyContent:'center',
                flexDirection: 'row'
            },
            button: {

                margin: 5,
                flex: 1,
                display: 'flex',
                alignItems:'center',
                justifyContent:'center',
                flexDirection: 'row'
            },
            backButtonImage: {
                width: 30,
                height: 30,
            }
        });
    }
}
