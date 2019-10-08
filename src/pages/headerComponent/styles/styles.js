import {StyleSheet} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

export default class Styles {
  static getSheet(isRTL) {
    return StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        borderBottomWidth:0.5,
        justifyContent:'center'

      },
      body: {
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        ...ifIphoneX({
          height: 80,
        }, {
          height: 50,
        }),

      },
      btn: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{scaleX: isRTL ? -1 : 1}],
        ...
          ifIphoneX({
            marginTop: 25,
          }, {
            marginTop: 10,
          }),
      },
      icon: {
        fontSize: 25,
        color: '#00003D',

      }
      ,
      horizontal: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
      ,
      title: {
        color: '#00003D',
        width: setWidth('50%'),
        fontWeight:
          '400',
        fontSize:
          25,
        ...
          ifIphoneX({
            marginTop: 24,
          }, {
            marginTop: 10,
          }),
        textAlign: 'center',
      },

    });
  }
}
