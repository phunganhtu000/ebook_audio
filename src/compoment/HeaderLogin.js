import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'native-base';
import {ThemeConstants} from '../cores/theme/Theme';
import TextComponent from '../cores/viewComponents/text/TextComponent';
import Locales from '../cores/languages/languages';
import {setWidth} from '../cores/viewComponents/baseFunctions/BaseFunctions';


export default class HeaderLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {navigate} = this.props.navigation;
        const data = this.state.data;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        // console.log('datahih: ' + JSON.stringify(data))
        return (
            <View style={[styles.container]}>
                <TextComponent>Login</TextComponent>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
