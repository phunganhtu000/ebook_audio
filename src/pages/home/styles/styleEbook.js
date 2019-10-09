import {StyleSheet, Dimensions} from 'react-native';
import {titleComponent, titleItem} from '../../../cores/viewComponents/text/texts';
import {colors} from '../../../cores/styles/colors';
import {
    getDataOfflineMode,
    setHeight,
    setWidth,
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {marginComponent, horizontalView, rowView} from '../../../cores/styles/styleView';

const {width} = Dimensions.get('window');
import {shadowComponent} from '../../../cores/viewComponents/shadow/Shadow';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#F3F6F5',
            },
            body: {
                marginTop: 25,
                //  ...marginComponent,

            },
            title: {
                fontSize: 16,
                fontWeight: '500',
                width: setWidth('35%'),
            },
            textMin: {
                fontSize: 12,
                color: colors.color_text_second,
                fontWeight: '500',

            },
            itemHeader: {
                ...horizontalView,
                paddingHorizontal: 20,
            },
            topSing: {
                marginTop: 10,
                marginLeft: 20,
                backgroundColor: '#fff',
            },
            imageSinger: {
                width: setWidth('38%'),
                height: setWidth('50%'),
                borderRadius: 5,
            },
            txtDes: {
                fontSize: 13,
                color: colors.lightGrey,
            },
            rate: {
                ...rowView,

            },
            time: {
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: colors.transparentBlack,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 5,
            },
            textTime: {
                color: colors.white,
            },
            btnPlay: {
                position: 'absolute',
                backgroundColor: colors.transparentBlack,
                right: 10,
                bottom: 10,
                width: setWidth('8%'),
                height: setWidth('8%'),
                borderRadius: 37 / 2,
                alignItems: 'center',
                justifyContent: 'center',
            },

            iconPlay: {
                color: colors.white,
                marginLeft: 5,
                fontSize: 16,
            },
            wrapper: {
            },
            slide1: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#9DD6EB'
            },
            slide2: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#97CAE5'
            },
            slide3: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#92BBD9'
            },
            text: {
                color: '#fff',
                fontSize: 30,
                fontWeight: 'bold'
            },
        });
    }
}
