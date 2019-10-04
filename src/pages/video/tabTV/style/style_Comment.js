import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../../cores/styles/colors';
import {setWidth} from '../../../../cores/viewComponents/baseFunctions/BaseFunctions';

const {width} = Dimensions.get('window');
export default class styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',

            },
            body: {
                marginTop: 10,
                marginLeft: "2.5%",

            },
            viewcontent: {
                alignItems: 'center', marginBottom: 20,
                // flexDirection: 'row'
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            viewallinput: {
                width: "100%",
                height: 45,
                borderRadius: 15,
                marginTop: "2.5%",
                marginLeft: "2.5%",
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            viewinput: {
                backgroundColor: colors.lightGray,
                borderRadius: 15,
                justifyContent: 'center',
            },
            input: {
                width: "90%",
                marginLeft: 10,
                marginRight: 10,
                fontSize: 15
            },
            toucoment: {
                position: 'absolute',
                right: 0,
                width: "8%"
            },
            iconcomment: {
                color: colors.red,
            },
            image: {
                width: 60,
                height: 60,
                borderRadius: 50,
                borderColor: "#BCC0B6",
                borderWidth: 0.5
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
                // textAlign: isRTL ? 'right' : 'left',
            },
            textcontent: {
                color: colors.color_text_second,
                fontSize: 14,
                // textAlign: isRTL ? 'right' : 'left',
            },
            star: {
                width: '20%',
                // textAlign: isRTL ? 'right' : 'left',
            },
            viewall: {
                  flexDirection: 'row',
               // flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                width: setWidth('80%'),
                marginLeft: 20,
                marginRight: 20,
            },
            viewcoment: {
                marginLeft: "2.5%", width: '80%',


            },
            viewplayer: {
                flexDirection: 'row',
                // flexDirection: isRTL ? 'row-reverse' : 'row',
            }
        });
    }
}
