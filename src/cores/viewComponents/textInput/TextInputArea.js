import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../styles/colors';
import { Dimens } from '../../styles/dimens';
export default class TextInputArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={colors.lightGrey}
                    numberOfLines={1}
                    placeholder={this.props.placeholder}
                    multiline={true}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    returnKeyType="next"
                    keyboardType={this.props.keyboardType}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textArea: {
        width: Dimens.screen.width - 30,
        borderColor: colors.lightGrey,
        height: null,
        borderRadius: 5,
        borderBottomWidth: 0.5,
        padding: 4,
        justifyContent: "flex-start",
        fontWeight: '400',
        fontSize: 16,
    },
});
