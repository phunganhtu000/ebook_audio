import {StyleSheet, Dimensions} from 'react-native';
import {setHeight, setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {colors} from '../../../cores/styles/colors';
import {large, medium, xslarge} from '../../../cores/styles/styleText';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
            },
            body: {
                paddingHorizontal: 10,
            },
            information: {
                marginTop: 20,
                paddingBottom: 20,
                borderBottomColor: colors.lightGrey,
                borderBottomWidth: 0.5,
            },
            information2: {
                marginTop: 20,
                paddingBottom: 50,
                borderBottomColor: colors.lightGrey,
                borderBottomWidth: 0.5,
            },
            horizontal: {
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            horizontal2: {
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
            },
            name: {
                ...xslarge,
                fontWeight: 'bold',
                marginBottom: 5,
                color: colors.color_text_second,
            },
            email: {
                color: '#50504b',
            },
            avatar: {
                width: 80,
                height: 80,
                marginRight: 20,
                backgroundColor: colors.background,
                borderRadius: 80 / 2,

            },
            lang: {
                fontSize: 15,
                color: '#50504b',
                ...medium,
                marginBottom: 5,
                fontWeight: '600',
            },
            icon: {
                fontSize: 25,
                color: 'black',
                transform: [{scaleX: isRTL ? -1 : 1}],
            },
            modal: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            itemModal: {
                padding: 10,
                width: setWidth('90%'),
                // height: setHeight('40%'),
                backgroundColor: colors.white,
                borderRadius: 10,
            },
            saparator: {
                height: 0.5,
                width: '100%',
                backgroundColor: '#C2C2C2',
                marginTop: 5,
                marginBottom: 10,
            },
            tittleModal: {
                fontSize: 18,
                paddingBottom: 10,
            },
            text: {
                // textAlign: isRTL ? 'right' : 'left',
                // color: '$textColor',
                paddingTop: 5,
                fontSize: 15,
            },
            viewButtonModal: {
                alignItems: 'center',
                justifyContent: 'center',
            },
            elementContainer: {
                paddingBottom: 5,
                paddingTop: 5,
            },
            btnCancel: {
                color: colors.blue,
                fontSize: 15,
                fontWeight: '500',
            },
        });
    }
}

