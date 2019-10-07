import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../cores/styles/colors';
import {
    getDataOfflineMode,
    setHeight,
    setWidth
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {
    horizontalView,
    rowView
} from '../../cores/styles/styleView';
import {ifIphoneX} from "react-native-iphone-x-helper";
const {width} = Dimensions.get('window');
export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: colors.background,
            },
            body: {
                backgroundColor: '#fff',
                // ...horizontalView,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: setWidth('100%'),
                height: setWidth('15%'),
                ...
                    ifIphoneX({
                        paddingLeft: 30,
                        paddingRight: 30
                    }, {
                        paddingLeft: 10,
                        paddingRight: 10
                    }),

            },
            viewplay: {flexDirection: isRTL ? 'row-reverse' : 'row'},
            iconbar: {
                color: "#C4AF21",
                fontSize: 30,
                ...
                    ifIphoneX({
                        marginRight: 30
                    }, {
                        marginRight: 10
                    }),
            },
            icon: {
                color: colors.white
            },
            imageplay: {
                transform: [{scaleX: isRTL ? -1 : 1}],

                width: setWidth('10%'),
                height: setWidth('10%'),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderColor: 'silver',
                borderWidth:0.5,
                ...
                    ifIphoneX({
                        marginLeft: 30,
                        marginRight: 30,
                    }, {
                        marginLeft: 10,
                        marginRight: 10,
                    }),

            },
            iconplay: {
                color: "#fff",
                fontSize: 15,
            },
            textmusic: {
                color: colors.black,
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: isRTL ? 'right' : 'left',
            },
            textsinger: {
                color: colors.black,
                fontSize: 15,
                textAlign: isRTL ? 'right' : 'left',
            },
            iconclose: {
                color: "silver",
                fontSize: 25,
            },
            viewtopbar: {
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                ...
                    ifIphoneX({
                        paddingLeft: 40,
                        paddingRight: 40,
                        paddingTop: 40
                    }, {
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 10
                    }),
            },
            viewimageplay: {
                alignItems: 'center',
                justifyContent: 'center',

            },
            icondown: {
                color: 'silver',
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center'
            },
            icondown2: {
                color: 'silver',
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center'
            },
            texttopbar: {
                color: '#000',
                fontWeight: 'bold',
                fontSize: 25
            },
            view: {
                height: setHeight('100%'),
                width: setWidth('100%'),
                opacity: 10
            },
            CarouselImage: {
                top: 10,
                width: setWidth('46%'),
                height: setWidth('70%'),
                borderRadius: 15,
                elevation: 5,
            },
            shadow: {
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5.5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 4.5,
            },
            viewfastimage: {
                width: setWidth('100%'),
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{scaleX: isRTL ? -1 : 1}],
                // flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            viewview: {...rowView,
                position: 'absolute',
                left: 10, bottom: 10,
                transform: [{scaleX: isRTL ? -1 : 1}],
            },
            imageMedium: {
                width: setWidth('80%'),
                height: setWidth('80%'),
                borderRadius: 20,
                ...
                    ifIphoneX({
                        marginTop: 60,
                    }, {
                        marginTop: 40,
                    }),
            },
            viewname: {
                alignItems: 'center',
                justifyContent: 'center',
                ...
                    ifIphoneX({
                        marginTop: 50,
                    }, {
                        marginTop: 30,
                    }),
            },
            titleItem: {

                fontSize: 25,
                fontWeight: 'bold',
                color: colors.black
            },
            textMin: {
                fontSize: 18,
                color: colors.black
            },
            textMin2: {
                fontSize: 18,
                color: colors.white,
            },
            viewicon: {
                width: setWidth('90%'),
                  ...horizontalView,
                transform: [{scaleX: isRTL ? -1 : 1}],
                ...
                    ifIphoneX({
                        marginTop: 50,
                    }, {
                        marginTop: 30,
                    }),
            },
            iconplay2: {
                color: colors.black,
                fontSize: 25,
            },
            slideraudio: {
                width: '90%',
                height: 100,
                transform: [{scaleX: isRTL ? -1 : 1}],
                ...
                    ifIphoneX({
                        marginTop: 30,
                        marginBottom: 30
                    }, {
                        marginTop: 10,
                        marginBottom: 10
                    }),
            },
            viewbottom: {
                // ...rowView,
                // ...paddingBottom5,
                width: setWidth('90%'),
                ...horizontalView,
                transform: [{scaleX: isRTL ? -1 : 1}],
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0
            },
            icongift: {
                color: '#232322',
                fontSize: 25,
            },
            viewiconbottom: {
                ...horizontalView
            },
            viewborder: {
                width: setWidth('8%'),
                height: setWidth('8%'),
                borderRadius: 100,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center'
            },
        });
    }
}
