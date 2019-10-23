import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {
    horizontalView, margin10,
    margin20,
    marginRight10,
    marginRight20,
    marginTop20,
    rowView,
} from '../../../cores/styles/styleView';
import {text13, texts, textTitle, typeText} from '../../../cores/viewComponents/text/texts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        ...margin10,
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

    },
    texttag: {
        ...text13,
        ...marginTop20,
        // color: colors.purple
    },
    item: {
        ...rowView,
        ...marginTop20,
        width: wp('100%'),

    },
    imageItem: {
        width: setWidth('25%'),
        height: setWidth('25%'),
        borderRadius: 15,
        elevation: 5,
        ...marginRight10,
    },
    viewText: {

        width: wp('60%'),
        // backgroundColor:'red'
    },
    horizontal: {
        ...horizontalView,
        width: wp('60%'),
    },
    book_audio: {},
    viewId: {
        marginRight: 10,
    },
    imgtrong: {
        width: setWidth('30%'),
        height: setWidth('30%'),
    },
});

