import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {horizontalView} from '../../cores/styles/styleView';
import {setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {colors} from '../../cores/styles/colors';
import {Icon} from 'native-base';
import Locales from '../../assets/languages/languages';
import {connect} from 'react-redux';
import {getDetail} from '../../redux/actions/productAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class ButtonBottom extends Component {
    render() {
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View
                style={[styles.container, styles.horizontal, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
                <TouchableOpacity
                    onPress={this.props.download}
                    style={styles.button}>
                    <Icon name='cloud-download' type='SimpleLineIcons'
                          style={{fontSize: 20, color: 'silver'}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.onPressNotification}
                    style={styles.button}>
                    <Icon name='notifications-active' type='MaterialIcons'
                          style={{fontSize: 20, color: 'silver'}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}>
                    <Icon name='heart' type='AntDesign' style={{fontSize: 20, color: 'silver'}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.onPressReadNow}
                    style={[styles.button2, {backgroundColor: '#D0021B'}]}>
                    <TextComponent style={{color: colors.white}}>{Locales.ReadNow}</TextComponent>
                </TouchableOpacity>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.productReducers.detail,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getDetail, darkMode})(ButtonBottom);
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    horizontal: {
        ...horizontalView,
    },
    button: {
        height: setWidth('12%'),
        width: setWidth('13%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    button2: {
        height: setWidth('13%'),
        width: setWidth('61%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

});
