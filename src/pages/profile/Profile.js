import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Switch,
    TouchableOpacity,
    StatusBar,
    Platform,
    Alert,
    Linking,
} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import Styles from './styles/Styles';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import Locales from '../../cores/languages/languages';
import Mailer from 'react-native-mail';
import Rate, {AndroidMarket} from 'react-native-rate';
import {getDataOfflineMode, setWidth, validateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import firebaseConfig from 'firebase';
import global from '../../cores/utils/global';
import {connect} from 'react-redux';
import {checkLogin} from '../../redux/actions/loginAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';
import HeaderLogin from '../../compoment/HeaderLogin';

class Profile extends Component {
    constructor(props) {
        super(props);
        // this.firebase = firebaseConfig.database();
        this.state = {
            isModalOpen: false,
            isLoading: false,
            viewRef: null,
            data: [],
        };
    }

    // async componentDidMount(): void {
    //     const rtl = await getDataOfflineMode(constants.isRTL)
    //     this.setState({
    //         isRTL: rtl
    //     })
    //
    // }

    signOut = () => {
    };

    getProfile(user) {
        this.firebase.ref('user').on('value', (dataSnapshot) => {
            dataSnapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                if (childData.uid === user.uid) {
                    this.setState({
                        isLoading: true,
                        data: childData,
                    }, () => {
                        // console.log("currentUser: " + JSON.stringify(childData));
                        global.name = this.state.data.name;
                        global.phone = this.state.data.phone;
                        global.uid = user.uid;

                    });
                }
            });
        });
    }

    handleEmail = () => {
        Mailer.mail({
            subject: 'Need Help',
            recipients: ['mozasolution@gmail.com'],
            ccRecipients: ['mozasolution@gmail.com'],
            bccRecipients: ['mozasolution@gmail.com'],
            body: '<b>...</b>',
            isHTML: true,
            attachment: {
                path: '',  // The absolute path of the file from which to read data.
                type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                name: '',   // Optional: Custom filename for attachment
            },
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                    {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')},
                ],
                {cancelable: true},
            );
        });
    };

    openWeb() {
        this.props.navigation.navigate('WebViewComponent', {item: 'http://www.mozagroup.com/'});
        // Linking.openURL('http://www.mozagroup.com/');
    }

    openAbout() {
        this.props.navigation.navigate('WebViewComponent', {item: 'http://www.mozagroup.com/about.html'});
        // Linking.openURL('http://www.mozagroup.com/about.html');
    }


    render() {
        const color = [['#5ee7df', '#b490ca'], ['#a18cd1', '#fbc2eb'], ['#ff9a9e', '#fad0c4'], ['#fad0c4', '#fad0c4'], ['#ff9a9e', '#fecfef'], ['#a18cd1', '#fbc2eb']];
        const styles = Styles.getSheet(this.state.isRTL);
        const {navigate} = this.props.navigation;
        const data = this.state.data;
        const {login} = this.props;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor}]}>
                <HeaderComponent
                    title={Locales.Profile}/>
                <ScrollView>
                    <View style={styles.body}>
                        {/*<HeaderLogin navigation={this.props.navigation}/>*/}
                        {/*{validateText(login) ?*/}
                        {/*    <TouchableOpacity*/}
                        {/*        onPress={() => navigate('UpdateProfile')}*/}
                        {/*        style={[styles.information2, styles.horizontal2]}>*/}

                        {/*        <View>*/}
                        {/*            <FastImage style={styles.avatar}*/}
                        {/*                       source={{uri: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.15752-0/p280x280/70811049_329186837901756_8137241036092080128_n.png?_nc_cat=102&_nc_oc=AQl1n37N-QWfd-Qm1KQiQbi4k6Sf2bA1qQdZlpMC4iExNBItCa4anH1fDoCRKvcwPck&_nc_ht=scontent.fhan2-1.fna&oh=a78211620dc941fc1f039e61d6496f7a&oe=5E2D79EE'}}*/}
                        {/*                       resizeMode={FastImage.resizeMode.contain}/>*/}
                        {/*        </View>*/}
                        {/*        <View>*/}
                        {/*            <TextComponent style={[styles.name, {color: ThemeConstants[theme].textColor}]}>Việt*/}
                        {/*                Jye</TextComponent>*/}
                        {/*            <TextComponent style={styles.email}>Vietjye2707</TextComponent>*/}
                        {/*        </View>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*    : <HeaderLogin navigation={this.props.navigation}/>*/}
                        {/*}*/}
                        <TouchableOpacity
                            onPress={() => navigate('Setting')}
                            style={[styles.information, styles.horizontal]}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='settings' type='SimpleLineIcons'
                                      style={[styles.icon, {color: ThemeConstants[theme].textColor, marginRight: 10}]}/>
                                <TextComponent
                                    style={[styles.lang, {color: ThemeConstants[theme].textColor}]}>{Locales.Settings}</TextComponent>
                            </View>
                            <Icon name='right' type='AntDesign'
                                  style={[styles.icon, {
                                      color: ThemeConstants[theme].textColor,
                                      fontSize: setWidth('5%'),
                                  }]}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigate('Downloads')}
                            style={[styles.information, styles.horizontal]}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='clouddownloado' type='AntDesign'
                                      style={[styles.icon, {color: ThemeConstants[theme].textColor, marginRight: 10}]}/>
                                <TextComponent
                                    style={[styles.lang, {color: ThemeConstants[theme].textColor}]}>{Locales.Downloads}</TextComponent>
                            </View>
                            <Icon name='right' type='AntDesign'
                                  style={[styles.icon, {
                                      color: ThemeConstants[theme].textColor,
                                      fontSize: setWidth('5%'),
                                  }]}/>
                        </TouchableOpacity>
                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => navigate('Downloads')}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View>*/}
                        {/*        <TextComponent style={styles.lang}>{Locales.Downloads}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Icon name='ios-arrow-forward' style={styles.icon}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity
                            onPress={() => this.openWeb()}
                            style={[styles.information, styles.horizontal]}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='questioncircleo' type='AntDesign'
                                      style={[styles.icon, {color: ThemeConstants[theme].textColor, marginRight: 10}]}/>
                                <TextComponent
                                    style={[styles.lang, {color: ThemeConstants[theme].textColor}]}>{Locales.frequentlyaskedquestions}</TextComponent>
                            </View>
                            <Icon name='right' type='AntDesign'
                                  style={[styles.icon, {
                                      color: ThemeConstants[theme].textColor,
                                      fontSize: setWidth('5%'),
                                  }]}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.openWeb()}
                            style={[styles.information, styles.horizontal]}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='appstore-o' type='AntDesign'
                                      style={[styles.icon, {color: ThemeConstants[theme].textColor, marginRight: 10}]}/>
                                <TextComponent
                                    style={[styles.lang, {color: ThemeConstants[theme].textColor}]}>{Locales.MoreApp}</TextComponent>
                            </View>
                            <Icon name='right' type='AntDesign'
                                  style={[styles.icon, {
                                      color: ThemeConstants[theme].textColor,
                                      fontSize: setWidth('5%'),
                                  }]}/>
                        </TouchableOpacity>
                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => this.openWeb()}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View>*/}
                        {/*        <TextComponent style={styles.lang}>{Locales.Term_Conditions}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Icon name='ios-arrow-forward' style={styles.icon}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity
                            // onPress={() => navigate('Downloads')}
                            onPress={() => this.handleEmail()}
                            style={[styles.information, styles.horizontal]}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='message1' type='AntDesign'
                                      style={[styles.icon, {color: ThemeConstants[theme].textColor, marginRight: 10}]}/>
                                <TextComponent
                                    style={[styles.lang, {color: ThemeConstants[theme].textColor}]}>{Locales.Feedback}</TextComponent>
                            </View>
                            <Icon name='right' type='AntDesign'
                                  style={[styles.icon, {
                                      color: ThemeConstants[theme].textColor,
                                      fontSize: setWidth('5%'),
                                  }]}/>
                        </TouchableOpacity>

                        {/*<TouchableOpacity*/}
                        {/*    // onPress={() => this.setState({ isModalOpen: true })}*/}
                        {/*    onPress={() => {*/}
                        {/*        let options = {*/}
                        {/*            AppleAppID: "2193813192",*/}
                        {/*            GooglePackageName: "com.econtent_ui",*/}
                        {/*            AmazonPackageName: "com.econtent_ui",*/}
                        {/*            OtherAndroidURL: "http://www.randomappstore.com/app/47172391",*/}
                        {/*            preferredAndroidMarket: AndroidMarket.Google,*/}
                        {/*            preferInApp: false,*/}
                        {/*            openAppStoreIfInAppFails: true,*/}
                        {/*            fallbackPlatformURL: "http://www.mywebsite.com/myapp.html",*/}
                        {/*        }*/}
                        {/*        Rate.rate(options, success => {*/}
                        {/*            if (success) {*/}
                        {/*                // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.*/}
                        {/*                this.setState({rated: true})*/}
                        {/*            }*/}
                        {/*        })*/}
                        {/*    }}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View>*/}
                        {/*        <TextComponent style={styles.lang}>{Locales.Rate_app}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Icon name='ios-arrow-forward' style={styles.icon}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => this.openAbout()}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View>*/}
                        {/*        <TextComponent style={styles.lang}>{Locales.About_US}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Icon name='ios-arrow-forward' style={styles.icon}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity*/}
                        {/*    // onPress={this.toggleModal}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View>*/}
                        {/*        <TextComponent style={styles.lang}>{Locales.ChangePassword}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Icon name='ios-arrow-forward' style={styles.icon}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}


                        {/*{validateText(login) ?*/}
                        {/*<TouchableOpacity*/}
                        {/*    onPress={this.signOut}*/}
                        {/*    style={[styles.information, styles.horizontal]}>*/}
                        {/*    <View style={{flexDirection: 'row'}}>*/}
                        {/*        <Icon name='logout' type='AntDesign'*/}
                        {/*              style={[styles.icon, {color: ThemeConstants[theme].textColor, marginRight: 10}]}/>*/}
                        {/*        <TextComponent*/}
                        {/*            style={[styles.lang, {color: ThemeConstants[theme].textColor}]}>{Locales.Logout}</TextComponent>*/}
                        {/*    </View>*/}
                        {/*    <Icon name='right' type='AntDesign'*/}
                        {/*          style={[styles.icon, {*/}
                        {/*              color: ThemeConstants[theme].textColor,*/}
                        {/*              fontSize: setWidth('5%'),*/}
                        {/*          }]}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*: null*/}
                        {/*}*/}
                    </View>
                </ScrollView>
                {/*<RateModal*/}
                {/*    rateBtnText={'Rate'}*/}
                {/*    cancelBtnText={'Cancel'}*/}
                {/*    totalStarCount={5}*/}
                {/*    defaultStars={5}*/}
                {/*    isVisible={true}*/}
                {/*    sendBtnText={'Send'}*/}
                {/*    commentPlaceholderText={'Placeholder text'}*/}
                {/*    emptyCommentErrorMessage={'Empty comment error message'}*/}
                {/*    iTunesStoreUrl={'itms-apps://itunes.apple.com/app/${APP_ID}'}*/}
                {/*    androidUrl={'market://details?id=${com.radio_kismayo_new}'}*/}
                {/*    isModalOpen={this.state.isModalOpen}*/}
                {/*    storeRedirectThreshold={3}*/}
                {/*    style={{*/}
                {/*        paddingHorizontal: 30,*/}
                {/*    }}*/}
                {/*    onStarSelected={(e) => {*/}
                {/*        console.log('change rating', e);*/}
                {/*    }}*/}
                {/*    onClosed={() => {*/}
                {/*        console.log('pressed cancel button...')*/}
                {/*        this.setState({*/}
                {/*            isModalOpen: false*/}
                {/*        })*/}
                {/*    }}*/}
                {/*    sendContactUsForm={(state) => {*/}
                {/*        alert(JSON.stringify(state));*/}
                {/*    }}*/}
                {/*/>*/}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.loginReducer.login,
    isDarkTheme: state.settingReducers.currentValue,
});
export default connect(mapStateToProps, {checkLogin, darkMode})(Profile);
