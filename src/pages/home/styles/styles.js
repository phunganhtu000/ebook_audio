import {StyleSheet, Dimensions} from 'react-native';
import {titleComponent, titleItem} from '../../../cores/viewComponents/text/texts';
import {colors} from '../../../cores/styles/colors';
import {
    getDataOfflineMode,
    setHeight,
    setWidth,
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {marginComponent} from '../../../cores/styles/styleView';

const {width} = Dimensions.get('window');
import {shadowComponent} from '../../../cores/viewComponents/shadow/Shadow';
import {medium} from '../../../cores/styles/styleText';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#F3F6F5',
            },
            body: {
                paddingHorizontal:setWidth('2.5%'),
                marginTop:setWidth('2.5%')
            },
            itemView: {
                flexDirection: 'row',
            },
            image: {
                width: setWidth('42.5%'),
                height: setWidth('60%'),
                borderRadius: 10,
                resizeMode: 'cover',
                alignItems: 'center',
                justifyContent: 'center',

            },
            imageItemTwo: {
                width: setWidth('42.5%'),
                height: setWidth('67%'),
                borderRadius: 10,
                resizeMode: 'cover',
                alignItems: 'center',
                justifyContent: 'center',
            },
            tab: {
                backgroundColor: colors.background,
                width: setWidth('93%'),
                height: setWidth('13%'),
                borderRadius: 5,
                padding: 3,
            },
            column: {
                flex: 1,
                flexDirection: 'column',
            },
            row: {
                flexDirection: 'row',
            },
            item: {
                flex: 1,
               // marginBottom: 15,
                margin:setWidth('2.5%')

            },
            title: {
                ...titleItem,
                width: '100%',
            },
            viewType: {
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: colors.blue,
                width: '30%',
                borderRadius: 3,
            },
            type: {
                textAlign: 'center',
                color: colors.white,
                fontWeight: '600',
            },
            listBook: {
                color: colors.red,
                fontSize: 12,
                paddingBottom: 10,
            },
            //AudioBook
            viewImage: {
                position: 'absolute',
            },
            time: {
                position: 'absolute',
                top: 10,
                right: 10,
                width:'90%',
                backgroundColor: colors.navbarBackgroundColor,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 5,
            },
            textTime: {
                color: colors.white,
                ...medium
            },
            btnPlay: {
                position: 'absolute',
                right: 10,
                bottom: 10,
                backgroundColor: 'black',
                width: setWidth('10%'),
                height: setWidth('10%'),
                borderRadius: setWidth('10%'),
                alignItems: 'center',
                justifyContent: 'center',
            },
            iconPlay: {
                color: colors.white,
                fontSize: 20,
            },
            viewList: {
                width: setWidth('100%'),
                paddingLeft: '5%',
            },

        });
    }
}
