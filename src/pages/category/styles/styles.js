import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {
    horizontalView,
    margin20,
    margin10,
    marginRight10,
    marginRight20,
    marginTop20,
    rowView, marginComponent,
} from '../../../cores/styles/styleView';
import {text13, texts, textTitle, typeText} from '../../../cores/viewComponents/text/texts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {shadowComponent} from '../../../cores/viewComponents/shadow/Shadow';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
            },
            shadow: {
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 5.5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 4.5,
            },
            title: {
                ...textTitle,
                // color: colors.purple,
                fontWeight: '500',
            },
            body: {
                // ...marginComponent,
                margin:setWidth('3.33333333333%')

            },
            e_book: {...marginTop20},
            type: {
                color: colors.red,
                paddingBottom: 5,
                ...typeText,
            },
            row: {
                ...rowView,
            },
            textAuthor: {
                marginTop: 5,
                ...text13,
                color: colors.color_text_second,
                paddingRight: 5,
            },
            text: {
                // ...marginTop20,
                ...texts,
                // color: colors.purple,
                width: wp('60%'),
                textAlign: isRTL ? 'right' : 'left',

            },
            texttag: {
                ...text13,
                ...marginTop20,
                // color: colors.purple
            },
            item: {
                ...rowView,
                ...marginTop20,
                width: wp('92'),
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            imageItem: {
                width: wp('25%'),
                height: wp('25%'),
                borderRadius: 15,
                // elevation: 5,
                ...marginRight10,
            },
            viewText: {
                marginLeft: isRTL ? 0 : 20,
                marginRight: isRTL ? 20 : 0,
                width: wp('60%'),
                // backgroundColor:'red'
            },
            horizontal: {
                ...horizontalView,
                height: wp('15%'),
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            book_audio: {},
            viewId: {
                marginRight: 10,
            },
            cate: {
                fontSize: 25,
                color: colors.textColorSecondary,
            },
            viewCate: {
                borderBottomColor: colors.lightGrey,
                borderBottomWidth: 1,
            },
            viewIcon: {
                width: wp('10%'),
                height: wp('10%'),
                backgroundColor: colors.colorPrimarySecond,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
            },

            name: {
                fontSize: 17,
                color: colors.white,
                fontWeight: 'bold',
            },
            fastImage: {
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderRadius: 15,
            },
            tou: {
                // justifyContent: 'center',
                // flex: 1,
                // alignItems: 'center',
                // width: setWidth('45%'),
                // height: setWidth('45%'),
                // margin: 4,
            },
            opacity: {
                width: setWidth('40%'),
                height: setWidth('40%'),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                margin:setWidth('3.33333333333%')
            },
        });
    }
}

