import {StyleSheet} from 'react-native';
import {setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {colors} from '../../cores/styles/colors';
export const styles = StyleSheet.create({
    saf: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    viewHeader: {
        marginTop: setWidth('5%'),
        marginBottom: setWidth('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    touAvatar: {
        backgroundColor: '#D9D9D9',
        borderRadius: setWidth('100%'),
        width: setWidth('30%'),
        height: setWidth('30%'),
    },
    avatar: {
        borderRadius: setWidth('100%'),
        width: setWidth('30%'),
        height: setWidth('30%'),
    },
    viewCamera: {
        position: 'absolute',
        backgroundColor: 'silver',
        width: setWidth('10%'),
        height: setWidth('10%'),
        borderRadius: setWidth('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        right: 0,
    },
    iconCamera: {
        color: colors.gray,
        fontSize: setWidth('6%'),
    },
    viewBody: {
        marginTop: setWidth('3%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewInput: {},
    textInput: {
        width: setWidth('85%'),
        height: setWidth('12%'),
        borderRadius: 5,
        borderColor: 'silver',
        borderWidth: 0.5,
        marginTop: setWidth('2%'),
        marginBottom: setWidth('5%'),
        paddingHorizontal: setWidth('2%'),
    },
    touBottom: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D0021B',
        width: setWidth('85%'),
        height: setWidth('12%'),
        borderRadius: 5,
        marginTop: setWidth('5%'),
    },
    textBottom: {
        color: colors.white,
        fontSize: setWidth('5%'),
        fontWeight: '600',
    },
});
