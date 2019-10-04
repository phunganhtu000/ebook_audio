import {StyleSheet, Dimensions} from 'react-native';
import {titleComponent, titleItem} from '../../../cores/viewComponents/text/texts';
import {colors} from '../../../cores/styles/colors';
import {setHeight, setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {
    horizontalView, marginComponent,
    marginhorizontal20,
    marginLeft10, marginLeft20, marginRight10, marginRight20,
    marginRight5,
    paddingBottom5,
    rowView
} from '../../../cores/styles/styleView';
import {ifIphoneX} from "react-native-iphone-x-helper";

const {width} = Dimensions.get('window');
export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            listItemContainer: {
                flex: 1,
                backgroundColor: '#fff',
            },
            viewToday: {
                // ...marginComponent

            },
            container: {
                flex: 1,
                backgroundColor: '#fff'
            },
            viewItem: {
                backgroundColor: '#fff'
            },
            itemHeader: {
                ...marginhorizontal20,
                // ...horizontalView
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            imgTop: {
                width: 30,
                height: 30,
                position: 'absolute',
                bottom: -10,
                right: -30,
                marginLeft: isRTL ? 0 : 20,
                marginRight: isRTL ? 20 : 0,
            },
            imageMax: {
                width: setWidth('35%'),
                height: setWidth('35%'),
                // ...marginLeft20,
                marginLeft: isRTL ? 0 : 20,
                marginRight: isRTL ? 20 : 0,
                borderRadius: 15,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                transform: [{scaleX: isRTL ? -1 : 1}] //doi chieu hinh anh
            },
            viewBottom: {
                // ...marginLeft20,
                marginLeft: isRTL ? 0 : 20,
                marginRight: isRTL ? 20 : 0,
                width: setWidth('35%'),
                marginTop: 5,
                marginBottom: 10
            },
            scrollView:{
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            rowView:{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center'
            },
            title: {
                fontSize: 25,
                fontWeight: '500',
                marginBottom: 5
            },
            titleItem: {
                fontSize: 15,
                ...titleComponent,
                textAlign: isRTL ? 'right' : 'left',
            },
            textMin: {
                fontSize: 12,
                color: colors.color_text_second,
                fontWeight: '500',
                textAlign: isRTL ? 'right' : 'left',
            },
            icon: {
                fontSize: 15,
                color: colors.mediumGray,
                ...marginRight5
            },
            viewSing: {
                width: setWidth('19%'),
                height: setWidth('19%'),
            },
            imageSinger: {
                width: setWidth('20%'),
                height: setWidth('20%'),
                borderRadius: setWidth('10%'),
                // ...marginLeft20,
                marginLeft: isRTL ? 0 : 20,
                marginRight: isRTL ? 20 : 0,
            },
            viewBottomSinger: {
                marginLeft: 20,
                width: setWidth('20%'),
                marginTop: 10,
                marginBottom: 10,

            },
            //item 3
            imageMedium: {
                width: setWidth('20%'),
                height: setWidth('20%'),
                ...marginLeft10,
                marginRight: 10,
                borderRadius: 15,
                // elevation: 5,
                ...marginRight10
            },
            viewMaxHorizontal: {
                // ...marginLeft20,
                // marginLeft: isRTL ? 0 : 20,
                // marginRight:isRTL?20:0,
                marginBottom: 10
            },
            flatList: {
                marginTop: 20,
                flex: 1
            },
            view: {
                width: width - 40,
                margin: 5,
                height: 200,

                //paddingHorizontal : 30
            },
            viewplay: {

                ...
                    ifIphoneX({
                        height: setHeight('7%')
                    }, {
                        height: setHeight('8%')
                    }),

            },
            viewliker: {
                ...rowView,
                ...paddingBottom5,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                // marginLeft: isRTL ? 0 : 20,
                // marginRight:isRTL?20:0,
            },
            viewview: {
                ...rowView, ...paddingBottom5,
                //  flexDirection: isRTL ? 'row-reverse' : 'row',
            }
        });
    }
}
