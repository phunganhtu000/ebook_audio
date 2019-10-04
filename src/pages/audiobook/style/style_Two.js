import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {margin10, marginRight10, marginRight20, rowView} from '../../../cores/styles/styleView';
import {texts} from '../../../cores/viewComponents/text/texts';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    body:{
        marginTop:20,

    },
    viewMagin10:{
        marginLeft:20,
        marginRight:20
    },

    type:{
        color:colors.red,
        fontSize:12,
        paddingBottom:10
    },
    title:{
        fontSize: 23,
        color:colors.purple
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    marginTop30:{
        marginTop: 30,
    },
    marginTop10:{
        marginTop:10
    },
    time:{
        marginTop: 20
    },
    textTime:{
        color:colors.color_text_second,
        fontSize:15,
        fontWeight: '500'
    },
    viewDetail:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginTop: 30,

    },
    borderImage:{
        width:setWidth('96%'),
        height:setWidth('80%'),
        borderTopLeftRadius: 40,
        borderBottomLeftRadius:40,
        backgroundColor: colors.searchColor,
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    image:{
        width:setWidth('96%'),
        height:setWidth('80%'),
        borderTopLeftRadius: 40,
        borderBottomLeftRadius:40,
        resizeMode: 'cover',
    },
    textReview:{
        fontSize: 28,
        color:colors.purple,
        fontWeight: '500'
    },
    text:{
        ...texts,
        color:colors.purple,
        fontWeight: '500',
        lineHeight:25
    },
    viewPlay:{
        position: 'absolute',
        bottom:10,
        right:10,
        ...rowView
    },
    btnInfo:{
        width:setWidth('11%'),
        height:setWidth('11%'),
        backgroundColor:colors.red,
        borderRadius:10,
        alignItems: 'center',
        justifyContent:'center',
        marginRight: 10
    },
    iconWhite:{
        color:colors.white
    },
    iconBlack:{
        color:colors.black,
        fontSize:20

    },
    btnPlay:{
        ...rowView,
        width:setWidth('15%'),
        height:setWidth('15%'),
        backgroundColor:colors.white,
        justifyContent:'center',
        borderRadius:55/2,
        shadowColor: "#10103d",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.37,
        shadowRadius: 3.49,
        elevation: 8,
        paddingLeft:5,
        ...marginRight20
    },
    textPlay:{
        fontSize:18,
        color:colors.white
    },
    itemPlay:{

        width:setWidth('70%'),
        // backgroundColor:'red'
    },
    marginLeft:{
        marginLeft:10,
        width:setWidth('55%'),
    }

})
