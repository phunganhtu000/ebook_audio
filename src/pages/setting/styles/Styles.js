import {StyleSheet, Dimensions} from 'react-native';
import {setHeight, setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {colors} from '../../../cores/styles/colors';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',

            },
            body: {

                paddingHorizontal:20
            },
            information: {
                marginTop: 20,
                paddingBottom: 20,
                borderBottomColor: colors.lightGrey,
                borderBottomWidth: 0.5
            },
            horizontal: {
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            name: {
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 5,
                // color:'$textColor'
            },
            email: {
                // color: '$TextManganeseGrey'
            },
            avatar: {
                width: 60,
                height: 60,
                backgroundColor: 'white',
                borderRadius: 60 / 2
            },
            lang: {
                fontSize: 15,
                // color:'$TextManganeseGrey',
                marginBottom: 5
            },
            icon: {
                fontSize: setWidth('7%'),
                // color: '$textColor'
                transform: [{scaleX: isRTL ? -1 : 1}],
            },
            modal: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor:'red'
            },
            itemModal: {
                padding: 10,
                width: setWidth('90%'),
                // height: setHeight('40%'),
                backgroundColor: 'silver',
                borderRadius: 10
            },
            saparator: {
                height: 0.5,
                width: '100%',
                backgroundColor: '#C2C2C2',
                marginTop: 5,
                marginBottom: 10
            },
            tittleModal: {
                fontSize: 18,
                paddingBottom: 10
            },
            text: {
                // textAlign: isRTL ? 'right' : 'left',
                // color: '$textColor',
                paddingTop: 5,
                fontSize: 15
            },
            viewButtonModal: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            elementContainer: {
                paddingBottom: 5,
                paddingTop: 5
            },
            btnCancel: {
                color: colors.blue,
                fontSize: 15,
                fontWeight: '500'
            },
            viewswitch:{
                transform: [{scaleX: isRTL ? -1 : 1}],
            }
        });
    }
}
