import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {
  horizontalView,
  margin10,
  marginLeft20,
  marginRight10,
  marginRight20,
  marginTop20,
  rowView,
} from '../../../cores/styles/styleView';
import {text13, texts} from '../../../cores/viewComponents/text/texts';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    marginTop: 20,
    alignItems: 'center',

  },
  viewMagin10: {
    marginLeft: 20,
    marginRight: 20,
  },

  type: {
    color: colors.color_text_second,
    fontSize: 12,
    paddingBottom: 5,
    paddingTop: 10,
  },
  title: {
    fontSize: 23,
    color: colors.white,
    paddingBottom: 10,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginTop30: {
    marginTop: 30,
  },
  marginTop10: {
    marginTop: 10,
  },
  viewDetail: {
    alignItems: 'center',
  },
  image: {
    width: setWidth('90%'),
    height: setWidth('90%'),
    resizeMode: 'cover',
    borderRadius: 20,
    shadowColor: '#10103d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.37,
    shadowRadius: 3.49,
    elevation: 8,
  },
  textReview: {
    fontSize: 23,
    // color: colors.purple,
    fontWeight: '500',
  },
  text: {
    fontSize: 14,
    // color: colors.purple,
    fontWeight: '500',
  },
  viewPlay: {
    // position: 'absolute',
    width: setWidth('90%'),
    height: setWidth('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparentBlack,
    borderRadius: 20,
  },
  btnInfo: {
    width: setWidth('11%'),
    height: setWidth('11%'),
    backgroundColor: colors.red,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconWhite: {
    color: colors.white,
  },
  iconBlack: {
    color: colors.white,
    fontSize: 20,
    paddingLeft: 5,
  },
  iconPause: {
    color: colors.white,
    fontSize: 20,
  },

  btnPlay: {
    ...rowView,
    width: setWidth('15%'),
    height: setWidth('15%'),
    backgroundColor: colors.transparentBlack,
    justifyContent: 'center',
    borderRadius: setWidth('15%') / 2,
    ...marginRight20,
  },
  textPlay: {
    fontSize: 18,
    color: colors.white,
  },
  titleList: {
    fontSize: 16,
    // color: colors.purple,
    fontWeight: '600',
  },
  itemPlay: {
    position: 'absolute',
    bottom: 10,
    width: setWidth('80%'),
    // backgroundColor:'red'
  },
  itemPlayList: {
    width: setWidth('70%'),
    // backgroundColor:'red'
  },
  slideList: {
    width: setWidth('55%'),
    marginLeft: 5,
  },
  marginLeft: {
    marginLeft: 10,
    width: setWidth('65%'),
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
    borderRadius: 5,
  },
  textTime: {
    color: colors.white,

  },
  //list
  itemList: {
    ...marginTop20,
    ...marginLeft20,
  },
  imageItem: {
    width: setWidth('32%'),
    height: setWidth('32%'),
    borderRadius: 15,

  },
  shadow: {
    shadowColor: '#10103d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.49,
    elevation: 5,
  },
  textMin: {
    fontSize: 12,
    color: colors.white,
  },
  btnZoom: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  iconZoom: {
    color: colors.white,
    fontSize: 22,
  },
  body2: {
    // ...marginComponent,
    margin: 15,

  },
  viewId: {
    marginRight: 10,
  },
  item: {
    ...rowView,
    ...marginTop20,
    width: wp('92'),
    flexDirection: 'row',
  },
  viewText: {
    marginLeft: 20,
    width: wp('60%'),
    // backgroundColor:'red'
  },
  text2: {
    // ...marginTop20,
    ...texts,
    // color: colors.purple,
    width: wp('60%'),
    textAlign: 'left',

  },
  horizontal2: {
    ...horizontalView,
    height: wp('15%'),
    flexDirection: 'row',
  },
  texttag: {
    ...text13,
    ...marginTop20,
    // color: colors.purple
  },
  textAuthor: {
    marginTop: 5,
    ...text13,
    color: colors.color_text_second,
    paddingRight: 5,
  },
});
