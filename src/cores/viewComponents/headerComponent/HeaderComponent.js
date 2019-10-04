import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../app/fooddelivery_redux/assets/colors';
import { Icon } from 'native-base';


export default class TextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.text, this.props.styleLeft]}>{this.props.textLeft}</Text>

                    </View>

                    <Text style={[styles.textCenter, this.props.styleTitle]}>{this.props.textTitle}</Text>
                    <TouchableOpacity onPress={this.props.onPressRight}>
                        <Text style={[styles.text, this.props.styleRight]}>{this.props.textRight}</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {

        borderBottomWidth: 1,
        borderBottomEndRadius: 1,
        borderColor: colors.gray,
        backgroundColor:colors.white

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        color:colors.black
    },
    textCenter:{
        color:colors.black,
        fontWeight:'bold',
        fontSize: 22
    }
});
