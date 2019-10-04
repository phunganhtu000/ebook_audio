import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {texts} from '../../../cores/viewComponents/text/texts';
import {rowView} from '../../../cores/styles/styleView';

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
        height:setWidth('60%'),
        borderTopLeftRadius: 40,
        borderBottomLeftRadius:40,
        backgroundColor: colors.searchColor,
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    image:{
        width:setWidth('85%'),
        height:setWidth('60%'),
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
    btnPlay:{
        ...rowView,
        width:setWidth('35%'),
        height:setWidth('11%'),
        backgroundColor:colors.purple,
        justifyContent:'center',
        borderRadius:10,

    },
    textPlay:{
        fontSize:18,
        color:colors.white
    }

})
