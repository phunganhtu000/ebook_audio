import {StyleSheet, Dimensions} from 'react-native';
import {titleComponent, titleItem} from '../../../cores/viewComponents/text/texts';
import {colors} from '../../../cores/styles/colors';
import {horizontalView, horizontal, rowView} from '../../../cores/styles/styleView';
import {shadowComponent} from '../../../cores/viewComponents/shadow/Shadow';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        ...horizontal,

    },
    itemHeader: {
        ...horizontalView,
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
        marginRight: 20,
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
        borderRadius: 5,
    },
    avatar: {
        width: setWidth('42%'),
        height: setWidth('55%'),
        backgroundColor: colors.background,
        borderRadius: 10,
        ...shadowComponent,
    },
    right_header: {
        width: setWidth('42%'),
    },
    author: {
        width: setWidth('42%'),
        fontSize: 12,
        color: colors.color_text_second,
        marginVertical: 10,
    },
    rating_text: {
        fontSize: 12,
        color: colors.textColorSecondary,
    },
    row: {
        ...rowView,
    },
    horizontal: {
        ...horizontalView,
    },
    body: {
        flex: 1,
        height: setWidth('100%'),
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
    title: {
        fontWeight: '500',
        fontSize: 15,
    },
    download: {
        marginTop: 30,
        ...shadowComponent,
    },
    txtRate: {
        fontSize: 14,
        color: colors.lightGrey,
    },
    txtDown: {
        color: colors.white,
        fontSize: 17,
    },
    btnDown: {
        backgroundColor: colors.colorPrimarySecond,
        width: setWidth('50%'),
        height: setWidth('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
});
