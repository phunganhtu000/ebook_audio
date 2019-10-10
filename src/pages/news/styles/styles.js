import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {
    horizontalView,
    marginComponent,
    marginRight10,
    marginRight20,
    marginTop20,
    rowView
} from '../../../cores/styles/styleView';
import {text13, texts, textTitle, typeText} from '../../../cores/viewComponents/text/texts';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#F3F6F5',
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
            title: {
                ...textTitle,
                // color: colors.purple,
                fontWeight: '500'
            },
            body: {
               marginHorizontal:setWidth('4%'),
            },
            type: {
                color: colors.red,
                paddingBottom: 5,
                ...typeText
            },
            textAuthor: {
                marginTop: 5,
                ...text13,
                color:'gray',
                height:setWidth('5%')
            },
            text: {
                ...texts,
                fontWeight: '500',
                height:setWidth('26%')

            },
            texttag: {
                ...text13,
                ...marginTop20,
                color: colors.purple
            },
            item: {
                ...rowView,
                marginTop:setWidth('4%'),
                width: setWidth('92%'),
                flexDirection: isRTL ? 'row-reverse' : 'row',
                backgroundColor: '#fff',
                borderRadius: 10,
            },
            imageItem: {
                width: setWidth('30%'),
                height: setWidth('35%'),
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                marginRight:setWidth('3%')
            },
            viewText: {
                width: setWidth('57%'),
                height: setWidth('35%'),
                marginRight:setWidth('2%'),
                // paddingVertical:setWidth('1%')
                // backgroundColor:'red',
                paddingVertical:setWidth('1%'),
            },
            viewId: {
                marginRight: 10
            }

        });
    }
}

