import React, { Component } from 'react';
import {
    Text, TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import { Dimens } from '../../styles/dimens';
import { colors } from '../../styles/colors';
import TextBlackComponent from "../text/textBlack/TextBlackComponent";

export default class TwoButton extends Component {

    render() {
        return (
            <View style={[styles.container,this.props.stylesBorder]}>
                <TouchableOpacity
                    onPress={this.props.onPressCancel}
                    style={styles.btnCancel}>
                    <TextBlackComponent style={styles.textCancel}>{this.props.leftButton}</TextBlackComponent>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.onPressSave}
                    style={styles.btnSave}>
                    <TextBlackComponent style={styles.textSave}>{this.props.rightButton}</TextBlackComponent>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
    },
    btnCancel: {
        borderRadius: 5,
        padding: 10,
        width: Dimens.screen.width / 2 - 32,
        height: 40,
        borderColor: colors.red,
        marginRight: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#FFF'
    },
    btnSave: {
        borderRadius: 5,
        width: Dimens.screen.width / 2 - 32,
        height: 40,
        marginLeft: 8,
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCancel: {
        color: colors.red,
        fontFamily: 'Kanit-Regular',
        fontSize: 14,
        fontWeight: '400'
    },
    textSave: {
        color: colors.white,
        fontSize: 14,
        fontFamily: 'Kanit-Regular',
        fontWeight: '400'
    }
});
