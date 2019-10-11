import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setHeight, setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    body: {
        marginTop: 10,
        marginLeft: '2.5%',
        height: setHeight('75%'),

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
        borderColor: '#BCC0B6',
        borderWidth: 0.5,
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
        backgroundColor: colors.froly,
    },
    txtName: {
        color: '#00003D',
        fontSize: 16,
        fontWeight: 'bold',
    },
    txtcontent: {
        color: colors.color_text_second,
        fontSize: 14,
    },

});
