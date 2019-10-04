import {StyleSheet, Dimensions} from 'react-native';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {horizontal, horizontalView, rowView} from '../../../cores/styles/styleView';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default class Styles {
    static getSheet(isRTL) {
        return StyleSheet.create({
            container: {
                flex: 1,
            },
            reader: {
                flex: 1,
                alignSelf: 'stretch',
                backgroundColor: '#3F3F3C'
            },
            bar: {
                position: "absolute",
                left: 0,
                right: 0,
                height: 55
            },
            ModalInsideView: {
                backgroundColor: "#fff",
                height: setWidth('65%'),
                width: '100%',
                ...
                    ifIphoneX({
                        marginTop: 85
                    }, {
                        marginTop: 50
                    })
            },
            viewslder: {
                //flexDirection: 'row',
                width: '90%',
                marginHorizontal: 15,
                marginTop: 20,
                alignItems: 'center',
                flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            TextStyle: {
                fontSize: 20,
                color: "#000",
            },
            viewfont: {
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                ...horizontalView,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                // flexDirection: 'row',
                // justifyContent: 'space-between'
            },
            theme1: {
                width: '30%',
                height: 50,
                backgroundColor: 'white',
                borderRadius: 20,
                borderColor: '#000',
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center'
            },
            textabc: {
                fontSize: 20,
                color: '#000'
            },
            theme2: {
                width: '30%',
                height: 50,
                backgroundColor: 'tan',
                borderRadius: 20,
                borderColor: '#000',
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center'
            },
            theme3: {
                width: '30%',
                height: 50,
                backgroundColor: 'black',
                borderRadius: 20,
                borderColor: '#000',
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center'
            },
            textabc2: {
                fontSize: 20,
                color: '#fff'
            },
        });
    }
}
