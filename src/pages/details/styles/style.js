import {StyleSheet, Dimensions} from 'react-native';
import {texts, titleItem} from '../../../cores/viewComponents/text/texts';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {horizontal, horizontalView, rowView} from '../../../cores/styles/styleView';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {shadowComponent} from '../../../cores/viewComponents/shadow/Shadow';

const {width} = Dimensions.get('window');
export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
            },
            button: {
                height: setWidth('12%'),
                width: setWidth('13%'),
                alignItems: 'center',
                justifyContent: 'center',
            },
            button2: {
                height: setWidth('13%'),
                width: setWidth('61%'),
                alignItems: 'center',
                justifyContent: 'center',
            },
            body: {marginTop:10},
            viewMagin10: {
                marginLeft: 10,
                marginRight: 10,
            },

            type: {
                color: colors.red,
                fontSize: 12,
                paddingBottom: 10
            },
            title: {
                fontSize: 18,
                // color:colors.purple
                textAlign: isRTL ? 'right' : 'left',
            },
            horizontal: {
                // flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            row: {
                // flexDirection: 'row',
                alignItems: 'center',
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            marginTop30: {
                marginTop: 10,
            },
            marginTop10: {
                marginTop: 10
            },
            time: {
                marginTop: 20,

            },
            textTime: {
                color: colors.color_text_second,
                fontSize: 15,
                fontWeight: '500'
            },
            viewDetail: {
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: 30,

            },
            borderImage: {
                width: setWidth('96%'),
                height: setWidth('60%'),
                borderTopLeftRadius: 40,
                borderBottomLeftRadius: 40,
                backgroundColor: colors.searchColor,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            },
            image: {
                width: setWidth('85%'),
                height: setWidth('60%'),
                borderTopLeftRadius: 40,
                borderBottomLeftRadius: 40,
                resizeMode: 'cover',
            },
            textReview: {
                fontSize: 28,
                // color:colors.purple,
                fontWeight: '500'
            },
            text: {
                ...texts,
                // color:colors.purple,
                lineHeight: 25
            },
            viewPlay: {
                position: 'absolute',
                bottom: 10,
                right: 10,
                ...rowView
            },
            btnInfo: {
                width: setWidth('11%'),
                height: setWidth('11%'),
                backgroundColor: colors.red,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10
            },
            iconWhite: {
                color: colors.white
            },
            btnPlay: {
                ...rowView,
                width: setWidth('35%'),
                height: setWidth('11%'),
                backgroundColor: colors.purple,
                justifyContent: 'center',
                borderRadius: 10,

            },
            textPlay: {
                fontSize: 18,
                color: colors.white
            },
            viewButtonBottom: {
                ...
                    ifIphoneX({
                        height: 70
                    }, {
                        height: 50
                    }),
                backgroundColor: '#fff'
            },
            txtChapname: {
                color: colors.black
            }
            ,
            header: {
                ...horizontal,

            },
            itemHeader: {
                ...horizontalView
            },
            ti: {
                fontSize: 16,
                fontWeight: '500',
            },
            textMin: {
                fontSize: 12,
                color: colors.color_text_second,
                fontWeight: '500',

            },
            topSing: {
                marginTop: 30,
                marginRight: 20
            },
            txtDes: {
                fontSize: 13,
                color: colors.lightGrey,
            },
            rate: {
                ...rowView,

            },
            imageSinger: {
                width: setWidth('30%'),
                height: setWidth('45%'),
                borderRadius: 5
            },
            avatar: {
                width: setWidth('42%'),
                height: setWidth('55%'),
                backgroundColor: colors.background,
                borderRadius: 10,
                ...shadowComponent
            },
            right_header: {
                width: setWidth('42%'),
            },
            author: {
                width: setWidth('42%'),
                fontSize: 12,
                color: colors.color_text_second,
                marginVertical: 10
            },
            rating_text: {
                fontSize: 12,
                color: colors.textColorSecondary,
            },
            tag: {
                backgroundColor: colors.lightGray,
                width: setWidth('18%'),
                height: setWidth('8%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 20,
                borderRadius: 3,


            },
            txtTag: {
                fontSize: 12,

            },
            download: {
                marginTop: 30,
                ...shadowComponent
            },
            txtRate: {
                fontSize: 14,
                color: colors.lightGrey
            },
            txtDown: {
                color: colors.white,
                fontSize: 17
            },
            btnDown: {
                backgroundColor: colors.colorPrimarySecond,
                width: setWidth('50%'),
                height: setWidth('12%'),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3
            },
            iconright: {
                fontSize: 20,
                color: colors.transparentBlack,
                marginLeft: 10,
                transform: [{scaleX: isRTL ? -1 : 1}]
            }
        });
    }
}
