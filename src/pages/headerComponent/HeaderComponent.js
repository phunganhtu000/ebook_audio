import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import {colors} from '../../cores/styles/colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {Icon} from 'native-base'
import {getDataOfflineMode, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Styles from './styles/styles';

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg: colors.purple
        };
    }

    async componentDidMount(): void {
        const rtl= await getDataOfflineMode(constants.isRTL)
        this.setState({
            isRTL:rtl
        })
        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR)
        this.setState({
            bg: backgroundColor
        })
    }

    render() {
       const styles= Styles.getSheet(this.state.isRTL)
        const color = this.state.bg
        return (
            <View
                style={[styles.container,]}>
                <View style={[styles.body, styles.horizontal]}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.props.onPressLeft}>
                        <Icon name={this.props.iconLeft} type={this.props.typeIconLeft} style={[styles.icon]}/>
                    </TouchableOpacity>
                    <View>
                        <TextComponent style={[styles.title]} numberOfLines={1}>{this.props.title}</TextComponent>
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.props.onPressRight}>
                        <Icon name={this.props.iconRight} type={this.props.typeIconRight} style={[styles.icon]}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


