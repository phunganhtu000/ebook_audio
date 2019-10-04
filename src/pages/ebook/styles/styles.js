import {StyleSheet, Dimensions} from 'react-native';
import {titleItem} from '../../../cores/viewComponents/text/texts';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    body: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',


    },
    itemView: {
        flexDirection: 'row',
        width: setWidth('95%'),
    },
    image: {
        width: '100%',
        height: setWidth('60%'),
        borderRadius: 10,
        resizeMode: 'cover',

    },
    imageItemTwo: {
        width: '100%',
        height: setWidth('65%'),
        borderRadius: 10,
        resizeMode: 'cover',
    },
    tab: {
        backgroundColor: colors.background,
        width: setWidth('93%'),
        height: setWidth('13%'),
        borderRadius: 5,
        padding: 3
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        margin: 5
    },
    row: {
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        marginBottom: 15

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
        borderRadius: 3
    },
    type: {
        textAlign: 'center',
        color: colors.white,
        fontWeight: '600'
    },
    //AudioBook
    viewImage: {
        position: 'absolute',
    },
    time: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: colors.transparentBlack,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5
    },
    textTime: {
        color: colors.white
    },
    btnPlay: {
        position: 'absolute',
        backgroundColor: colors.transparentBlack,
        right: 10,
        bottom: 10,
        width: setWidth('10%'),
        height: setWidth('10%'),
        borderRadius: 37 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconPlay: {
        color: colors.white,
        marginLeft: 5,
        fontSize: 18,
    }
})
