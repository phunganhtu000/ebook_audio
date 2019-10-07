import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, StatusBar, Switch} from 'react-native';
import {Icon} from "native-base";
import Modal from "react-native-modal";
import Styles from './styles/Styles';
import {StackActions, NavigationActions} from 'react-navigation';
import {
    getDataOfflineMode,
    saveDataOfflineMode
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import HeaderComponent from '../headerComponent/HeaderComponent';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from '../../assets/languages/languages';
import {colors} from '../../cores/styles/colors';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Menu'})],
});

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: null,
            style: null,
            switchValue: false,
            isModalVisible: false,
            isLoading: false,
            description: '',
            dob: new Date(),
            dobText: '',
            gender: '',
            check: '',
            current_password: '',
            new_password: '',
            language: '',
            isRTL: false,
            getLanguage: '',
            login_token: '',
            isModalTheme: false,
            shouldRender: false,
            shouldRender1: false,
            backgroundColor: colors.purple
        };
        const lang = [
            {shortform: 'en', longform: 'English'},
            {shortform: 'vn', longform: 'Việt Nam'},
            {shortform: 'ar', longform: 'عربى'},
            {shortform: 'jp', longform: '日本語'},
        ];
        global.lang = lang;
    }

    async componentDidMount(): void {
        const rtl = await getDataOfflineMode(constants.isRTL)
        this.setState({
            isRTL: rtl
        })
        const isChangeTheme = await getDataOfflineMode(constants.CHANGE_THEME);
        const style = await getDataOfflineMode(constants.CHANGE_STYLE);
        this.setState({
            theme: isChangeTheme,
            style: style,
        });

        const dataLanguage = await getDataOfflineMode(constants.LANGUAGE);
        this.setState({
            getLanguage: dataLanguage,
        })
        Locales.setLanguage(this.state.getLanguage);
        // await this.getProfile();
        // const isDarkMode = await getDataOfflineMode(constants.DARK_MODE);
        // this.setState(
        //     {
        //         shouldRender: isDarkMode,
        //         switchValue: isDarkMode,
        //     }, () => {
        //         if (isDarkMode === false || inValidateText(isDarkMode)) {
        //             EStyleSheet.build(lightTheme);
        //             StatusBar.setBarStyle('dark-content');
        //             console.log('log :', isDarkMode)
        //         } else {
        //             EStyleSheet.build(darkTheme);
        //             StatusBar.setBarStyle('light-content');
        //         }
        //         console.log('theme isDarkMode: ' + isDarkMode)
        //     }
        // );


    }

    toggleSwitch = (value) => {
        this.setState({switchValue: value}, () => {
        });
        if (value === false) {
            saveDataOfflineMode(constants.DARK_MODE, false)
            const backgroundColor = colors.purple;
            StatusBar.setBarStyle('dark-content');
            // saveDataOfflineMode(constants.CHANGE_COLOR,backgroundColor)
        } else {
            saveDataOfflineMode(constants.DARK_MODE, true)
            const backgroundColor = colors.white;
            StatusBar.setBarStyle('light-content');
            // saveDataOfflineMode(constants.CHANGE_COLOR,backgroundColor)
        }
        console.log('switchValue:' + this.state.switchValue)
    }
    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };
    toggleModalTheme = () => {
        this.setState({isModalTheme: !this.state.isModalTheme});
    };

    settext(value) {
        console.log('lang: ' + value);
        Locales.setLanguage(value);

        if (value === 'ar') {
            saveDataOfflineMode(constants.isRTL, true)
        } else {
            saveDataOfflineMode(constants.isRTL, false);
        }
        saveDataOfflineMode(constants.LANGUAGE, value)
        // this.props.navigation.dispatch(resetAction);
        this.setState({isModalVisible: !this.state.isModalVisible});
    }


    changeBlue() {
        this.setState({
            backgroundColor: colors.iOSBlue
        }, () => {
            saveDataOfflineMode(constants.CHANGE_COLOR, this.state.backgroundColor)
        })
    }

    changeRed() {
        this.setState({
            backgroundColor: colors.red
        }, () => {
            saveDataOfflineMode(constants.CHANGE_COLOR, this.state.backgroundColor)
        })
    }

    changePurple() {
        this.setState({
            backgroundColor: colors.purple
        }, () => {
            saveDataOfflineMode(constants.CHANGE_COLOR, this.state.backgroundColor)
        })
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL)
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    onPressLeft={() => this.props.navigation.dispatch(resetAction)}
                    title={Locales.Setting}/>
                <ScrollView>
                    <View style={styles.body}>
                        <TouchableOpacity
                            onPress={this.toggleModal}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent
                                    style={styles.lang}>{Locales.Selectyourlanguage}</TextComponent>
                                <TextComponent>{Locales.language}</TextComponent>
                            </View>
                            <View>
                                <Icon name='language' type='Entypo' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.DarkMode}</TextComponent>
                            </View>
                            <View style={styles.viewswitch}>
                                <Switch
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.switchValue}/>
                            </View>
                        </View>
                        {/*<TouchableOpacity*/}
                        {/*    onPress={this.toggleModalTheme}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View>*/}
                        {/*        <TextComponent style={styles.lang}>{Locales.Change_Color}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Icon name='ios-arrow-forward' style={styles.icon}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => this.props.navigation.push('ChangeTheme')}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View>*/}
                        {/*        <TextComponent style={styles.lang}>{Locales.Change_Theme}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.horizontal}>*/}
                        {/*        <TextComponent style={{*/}
                        {/*            color: colors.textColorSecondary,*/}
                        {/*            marginRight: 20*/}
                        {/*        }}> Theme {this.state.theme + 1}</TextComponent>*/}
                        {/*        <Icon name='ios-arrow-forward' style={styles.icon}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => navigate('ChangeStyle')}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View>*/}
                        {/*        <TextComponent style={styles.lang}>{Locales.Change_Style}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.horizontal}>*/}
                        {/*        <TextComponent style={{*/}
                        {/*            color: colors.textColorSecondary,*/}
                        {/*            marginRight: 20*/}
                        {/*        }}>Style {this.state.style + 1}</TextComponent>*/}
                        {/*        <Icon name='ios-arrow-forward' style={styles.icon}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.isModalVisible}>
                    <TouchableOpacity
                        onPress={this.toggleModal}
                        style={styles.modal}>
                        <View style={styles.itemModal}>
                            <TextComponent
                                style={styles.tittleModal}>{Locales.Selectyourlanguage}</TextComponent>
                            <ScrollView style={{width: '100%'}}>
                                {global.lang.map((item, key) => (
                                    <View key={key} style={styles.elementContainer}>
                                        <TextComponent
                                            key={key}
                                            ref={item.shortform}
                                            onPress={() => this.settext(item.shortform)}
                                            style={styles.text}>
                                            {item.longform}
                                        </TextComponent>
                                        <View key={key} style={styles.saparator}/></View>
                                ))}
                            </ScrollView>
                            <TouchableOpacity style={styles.viewButtonModal} onPress={this.toggleModal}>
                                <Text style={styles.btnCancel}>{Locales.Cancel}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <Modal isVisible={this.state.isModalTheme}>
                    <TouchableOpacity
                        onPress={this.toggleModalTheme}
                        style={styles.modal}>
                        <View style={styles.itemModal}>
                            <TextComponent style={styles.tittleModal}>{Locales.Change_Color}</TextComponent>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity
                                    onPress={() => this.changeBlue()}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.blue,
                                        marginRight: 10
                                    }}>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.changeRed()}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.red,
                                        marginRight: 10
                                    }}>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.changePurple()}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.purple,
                                        marginRight: 10
                                    }}>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.viewButtonModal} onPress={this.toggleModalTheme}>
                                <TextComponent style={styles.btnCancel}>{Locales.Cancel}</TextComponent>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

