import {StyleSheet, Dimensions} from 'react-native';
import {setHeight, setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {colors} from '../../../cores/styles/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {text13, texts, textTitle, typeText} from '../../../cores/viewComponents/text/texts';
import {
    horizontalView,
    margin20,
    marginRight10,
    marginRight20,
    marginTop20,
    rowView
} from '../../../cores/styles/styleView';

export default class styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
            },
            flat: {
                width: setWidth('93%')
            },
            filter: {
                width: setWidth('13%'),
                alignItems: 'center',
                justifyContent: 'center',
            },
            textStyle: {
                padding: 10,
                fontSize: 17,
            },
            viewHorizontal: {
                flexDirection: 'row',
                alignItems: 'center',

            },
            location: {
                marginRight: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                width: setWidth('20%'),
                alignItems: 'center',
                height: 33.5,
                backgroundColor: colors.location,
                borderRadius: 10,
            },
            accBar: {
                width: setWidth('94%'),
                marginTop: setWidth('10%'),
                paddingHorizontal: setWidth('3%'),
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            input: {
                width: setWidth('71%'),
                paddingHorizontal: setWidth('3%')
            },
            txtBar: {
                marginTop: 15,
                fontSize: 18,
                color: colors.black,
                textAlign: 'center'
            },
            searchBar: {
                // flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                width: setWidth('78%'),
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.background,
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            item: {
                ...rowView,
                ...marginTop20,
                width: wp('95%'),
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            imageItem: {
                width: wp('18%'),
                height: wp('18%'),
                borderRadius: 15,
                elevation: 5,
                ...marginRight10
            },
            viewText: {
                // textAlign: isRTL ? 'left' : 'right',
                width: wp('60%'),
                // backgroundColor:'red'
            },
            horizontal: {
                ...horizontalView,
                width: wp('60%'),
            },
            row: {
                ...rowView
            },
            textAuthor: {
                marginTop: 5,
                ...text13,
                color: colors.color_text_second,
                paddingRight: 5
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
        });
    }
}
