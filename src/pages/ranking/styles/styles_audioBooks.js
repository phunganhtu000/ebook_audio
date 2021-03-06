import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from '../../../cores/styles/colors';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {horizontalView, marginComponent, marginRight20, marginTop20, rowView} from '../../../cores/styles/styleView';
import {text13, texts, textTitle, typeText} from '../../../cores/viewComponents/text/texts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    ThumbnailBackgroundView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: setWidth('50%'),
        height: setWidth('80%'),
        borderRadius: 15,
    },
    CarouselImage: {
        top: 10,
        width: setWidth('46%'),
        height: setWidth('70%'),
        borderRadius: 15,
        elevation: 5,
    },
    btnPlay: {
        position: 'absolute',
        backgroundColor: colors.transparentBlack,
        left: 10,
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
    },
    shadow: {
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.5,
    },
    title: {
        ...textTitle,
        color: colors.purple,
        fontWeight: '500'
    },
    body: {
        ...marginComponent
    },
    e_book: {},
    type: {
        color: colors.red,
        paddingBottom: 5,
        ...typeText
    },
    row: {
        ...rowView
    },
    textAuthor:{
        ...marginTop20,
        ...text13,
        color: colors.color_text_second
    },
    text: {
        // ...marginTop20,
        ...texts,
        color: colors.purple
    },
    texttag: {
        ...text13,
        ...marginTop20,
        color: colors.purple
    },
    item: {
        ...rowView,
        ...marginTop20,
        width:setWidth('100%'),
        backgroundColor:'red'

    },
    imageItem:{
        width:setWidth('23%'),
        height:setWidth('23%'),
        borderRadius:15,
        elevation: 5,
        ...marginRight20
    },
    viewText:{

        width:setWidth('60%'),
        // backgroundColor:'red'
    },
    horizontal:{
      ...horizontalView
    },
    book_audio: {}

})

