import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setHeight, setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
            },
            body: {
                marginTop: 10,
                marginLeft: "2.5%",
                height:setHeight('80%')

            },
            viewall: {
                //  flexDirection: 'row',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                marginBottom: 20,
                width: '90%',
                //  transform: [{scaleX: isRTL ? -1 : 1}]
            },
            viewpepo: {
                marginLeft: "2.5%", width: '75%',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            viewallinput: {
                width: setWidth('94%'),
                height: setWidth('12%'),
                paddingHorizontal: setWidth('3%'),
                marginHorizontal: setWidth('3%'),
                borderRadius: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            input: {
                fontSize: 15,
                width: setWidth('81%'),
            },
            toucoment: {
                width: setWidth('7%'),
                // backgroundColor: 'red'
            },
            iconcomment: {
                color: colors.red,
            },
            image: {
                width: setWidth('15%'),
                height: setWidth('15%'),
                borderRadius: setWidth('15%'),
                borderColor: "#BCC0B6",
                borderWidth: 0.5
            },
            horizontal: {
                // flexDirection: 'row',
                //justifyContent: 'space-between',
                // alignItems: 'center',
                //  textAlign: isRTL ? 'right' : 'left',
            },
            btnBook: {
                justifyContent: 'center',
                alignItems: 'center',
                height: '90%',
                width: '90%',
                borderRadius: 10,
                backgroundColor: colors.froly
            },
            txtName: {
                color: '#00003D',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: isRTL ? 'right' : 'left',
            },
            txtcontent: {
                color: colors.color_text_second,
                fontSize: 14,
                textAlign: isRTL ? 'right' : 'left',
            }
        });
    }
}
