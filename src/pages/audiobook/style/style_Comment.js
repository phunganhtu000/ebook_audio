import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../cores/styles/colors';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    body: {
        marginTop: 10,
        marginLeft: "2.5%"

    },
    viewallinput:{
        width: "95%",
        height: 60,
        borderRadius: 15,
        marginTop: "2.5%",
        marginLeft: "2.5%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewinput: {
        width: "95%",
        backgroundColor: colors.lightGray,
        borderRadius: 15,
        justifyContent: 'center',
    },
    input: {
        width: "90%",
        marginLeft: 10,
        marginRight:10,
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
        borderColor:"#BCC0B6",
        borderWidth:0.5
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
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
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
