import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {horizontalView} from '../../cores/styles/styleView';
import {setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {colors} from '../../cores/styles/colors';
import {Icon} from 'native-base';
import Locales from '../../assets/languages/languages';
import {connect} from 'react-redux';
import {getDataHome, getDetail} from '../../redux/actions/productAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';
import {addToFavorite, getDataFavorite, removeFavorite} from '../../redux/actions/favoriteAction';

class ButtonBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            check: false,
        };
    }

    componentDidMount() {
        this.props.getDataHome();
        this.props.getDataFavorite();
        this.checkFavorite();
    }

    checkFavorite() {
        const {getdatahome} = this.props;
        const {favorite} = this.props;
        const check = favorite.some(favorite => getdatahome.id === favorite.id);
        this.setState({
            check: check,
        });
    }

    _favorite(getdatahome) {
        const {favorite} = this.props;
        const check = favorite.some(favorite => getdatahome.id === favorite.id);
        console.log('check: ' + JSON.stringify(check));
        if (check == false) {
            this.props.addToFavorite(getdatahome);
            this.setState({
                check: true,
            });

        } else {
            this.props.removeFavorite(getdatahome);
            this.setState({
                check: false,
            });
        }
    }

    render() {
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        const {favorite} = this.props;
        console.log('favoriteRedn', JSON.stringify(favorite));
        console.log('ckeck:', JSON.stringify(this.state.check));
        const {getdatahome} = this.props;
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
                <TouchableOpacity onPress={() => this._favorite(getdatahome)}
                                  style={styles.button}>
                    {this.state.check ? <Icon name='heart' type='AntDesign' style={{fontSize: 20, color: '#D0021B'}}/> :
                        <Icon name='heart' type='AntDesign' style={{fontSize: 20, color: 'silver'}}/>}
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
        getdatahome: state.productReducers.gethome,
        isDarkTheme: state.settingReducers.currentValue,
        favorite: state.favoriteReducers,
    };
}

export default connect(mapStateToProps, {
    getDataHome,
    darkMode,
    addToFavorite,
    removeFavorite,
    getDataFavorite,
})(ButtonBottom);
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
