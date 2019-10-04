import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TextComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Text
                    onPress={this.props.onPress}
                    key={this.props.key}
                    style={[styles.text, this.props.style]}
                    numberOfLines={this.props.numberOfLines}>{this.props.children}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text:{

    }
});
