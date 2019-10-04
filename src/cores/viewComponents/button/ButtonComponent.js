import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {Dimens} from '../../styles/dimens';

export default class ButtonComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.container, this.props.styles]}>
                <Text style={[styles.text,this.props.styleText]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width: Dimens.screen.width / 1.15,
        height: 50,
        backgroundColor: colors.orange,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text:{
        fontSize:16,
        color:colors.white,
        fontWeight: '500'
    }
});
