import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {
    horizontalView, marginComponent,
    rowView
} from '../../../cores/styles/styleView';

const {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        imageSinger: {
            width: setWidth('22%'),
            height: setWidth('22%'),
            borderRadius: setWidth('11%'),
            marginTop: 20,
        },
        viewAvt: {
            width: '100%',
            alignItems: 'center',
        },
        fullName: {
            fontSize: 18,
            fontWeight: '500',
            marginTop: 10,
        },
        name: {
            fontSize: 14,
            color: colors.textColorSecondary,
            marginTop: 5
        },
        fb: {
            fontSize: 14,
            color: colors.purple,
            marginTop: 15,
        },
        fanAndFollow: {
            ...rowView,
            height: setWidth('15%'),
            marginTop: 20,
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1
        },
        view: {
            height: setWidth('8%'),
            width: 1.5,
            backgroundColor: colors.lightGray,
        },
        fan: {
            alignItems: 'center',
            width: setWidth('45%'),
        },
        follow: {
            alignItems: 'center',
            width: setWidth('45%'),
        },
        txtFan: {
            fontWeight: '500'
        },
        txtFollow: {
            fontWeight: '500'
        },
        tym: {},
        imgTop: {
            width: 30,
            height: 30,
            position: 'absolute',
            bottom: 0,
            right: 0,
        },
        viewSing: {
            width: setWidth('15%'),
            height: setWidth('15%'),
            justifyContent: 'center',
            alignItems: 'center'
        },
        imageSing: {
            width: setWidth('12%'),
            height: setWidth('12%'),
            borderRadius: setWidth('10%'),
        },
        fanRank: {
            ...horizontalView,
            // width: setWidth('100%'),
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1,
            paddingBottom: 10,
            ...marginComponent
        },
        fanBoard: {
            paddingVertical:10,
            ...marginComponent,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.lightGray,
            borderRadius: 3
        }
    }
)
