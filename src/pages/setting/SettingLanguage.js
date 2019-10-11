import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Alert, Image} from 'react-native';
import {darkMode, selectLanguage} from '../../redux/actions/settingAction';
import RNRestart from 'react-native-restart';
import {connect} from 'react-redux';
import Locales from '../../cores/languages/languages';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {setWidth, validateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {ThemeConstants} from '../../cores/theme/Theme';
import {small2} from '../../cores/styles/styleText';
import {colors} from '../../cores/styles/colors';
import HeaderComponent from '../headerComponent/HeaderComponent';

class SettingLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: 0,
            lang: [
                {
                    id: 0,
                    set_lang: 'en',
                    language: Locales.Englang,
                    color: '#f7f7f7',
                    image: require('../../assets/image/Englang.png'),
                },
                {
                    id: 1,
                    set_lang: 'vn',
                    language: Locales.Vietlang,
                    color: '#f7f7f7',
                    image: require('../../assets/image/Vietnam.png'),
                },
            ],
        };
    }

    setItem(item) {
        this.setState({
            check: item.id,
            set_lang: item.set_lang,
        });
    }

    setLanguage(set_lang) {
        if (validateText(set_lang)) {
            console.log('set_lang: ' + set_lang);
            this.props.selectLanguage(set_lang);
            RNRestart.Restart();
        } else {
            Alert.alert('Choose the language');
        }

    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <SafeAreaView style={[styles.saf, {backgroundColor: ThemeConstants[theme].backgroundColor}]}>
                <View style={[styles.container]}>
                    <HeaderComponent
                        iconLeft='ios-arrow-back'
                        left='back'
                        onPressLeft={() => navigation.goBack()}
                        title={Locales.Language}/>
                    <View style={styles.body}>
                        <View style={styles.body}>
                            {this.state.lang.map(function (item, index) {
                                return (
                                    <View key={index}>
                                        {
                                            this.state.check == index ?
                                                <TouchableOpacity activeOpacity={1}
                                                                  style={[styles.option, {backgroundColor: ThemeConstants[theme].optionbackground}]}
                                                                  onPress={() => {
                                                                      this.setItem(item);
                                                                  }}>
                                                    <View style={styles.languages}>
                                                        <Image source={item.image} style={styles.image}/>
                                                        <TextComponent
                                                            style={[styles.textlang, {color: ThemeConstants[theme].textColor}]}>{item.language}</TextComponent>
                                                    </View>
                                                    <View/>
                                                </TouchableOpacity> :
                                                <TouchableOpacity activeOpacity={1}
                                                                  style={[styles.option1]}
                                                                  onPress={() => {
                                                                      this.setItem(item);
                                                                  }}>
                                                    <View style={styles.languages}>
                                                        <Image source={item.image} style={styles.image}/>
                                                        <TextComponent
                                                            style={[styles.textlang, {color: ThemeConstants[theme].textColor}]}>{item.language}</TextComponent>
                                                    </View>
                                                    <View/>
                                                </TouchableOpacity>
                                        }
                                    </View>);
                            }.bind(this))
                            }
                        </View>
                    </View>

                    <View style={styles.viewswitch}>
                        <TouchableOpacity activeOpacity={1}
                                          onPress={() => this.setLanguage(this.state.set_lang)}
                                          style={styles.switchlang}>
                            <TextComponent style={styles.textswitchlang}>OK</TextComponent>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.settingReducers,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {darkMode, selectLanguage})(SettingLanguage);
export const styles = StyleSheet.create({
    saf: {
        flex: 1,
    },
    body: {
        paddingHorizontal: setWidth('3%'),
        paddingTop: setWidth('3%'),
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: setWidth('5%'),
        padding: setWidth('2%'),
        //  backgroundColor: colors.background
    },
    option1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: setWidth('5%'),
        padding: setWidth('2%'),
        //backgroundColor:colors.background
    },
    languages: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: setWidth('15%'),
        height: setWidth('10%'),
        marginRight: setWidth('5%'),
    },
    textlang: {
        ...small2,
    },
    viewswitch: {alignItems: 'center'},
    switchlang: {
        backgroundColor: colors.colorApp,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: setWidth('10%'),
        height: setWidth('12%'),
        width: setWidth('45%'),
    },
    textswitchlang: {
        ...small2,
        color: colors.white,

    },
});
