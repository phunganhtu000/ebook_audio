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
import {firebaseConfig} from '../../api/firebase/firebaseConfig';
import global from '../../cores/utils/global';
import {connect} from 'react-redux';
import {checkLogin} from '../../redux/actions/loginAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';
import HeaderLogin from '../../compoment/HeaderLogin';
import firebase from 'react-native-firebase';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.firebase = firebaseConfig.database();
        this.state = {
            isModalOpen: false,
            isLoading: false,
            viewRef: null,
            data: [],
        };
    }

    componentDidMount() {
        this.props.checkLogin();
        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.props.checkLogin();
        });
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.getProfile(user);
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,

                });
            }
        });
    }

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

    componentWillUnmount() {
        this.focusListener.remove();
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    // async componentDidMount(): void {
    //     const rtl = await getDataOfflineMode(constants.isRTL)
    //     this.setState({
    //         isRTL: rtl
    //     })
    //
    // }

    signOut = () => {
        firebase.auth().signOut();
    };


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

                        {validateText(login) ?
                            <TouchableOpacity
                                onPress={() => navigate('EditProfile', {data: data})}
                                style={[styles.information2, styles.horizontal2]}>

                                <View>
                                    <FastImage style={styles.avatar}
                                               source={{uri: data.avatar}}
                                               resizeMode={FastImage.resizeMode.contain}/>
                                </View>
                                <View>
                                    <TextComponent
                                        style={[styles.name, {color: ThemeConstants[theme].textColor}]}>{data.name}</TextComponent>
                                    <TextComponent style={styles.email}>{data.email}</TextComponent>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => navigate('Login')} style={styles.tologin}>
                                <TextComponent style={styles.textlogin}>{Locales.Login}</TextComponent>
                            </TouchableOpacity>
                        }

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
                        <TouchableOpacity
                            onPress={() => navigate('Favorite')}
                            style={[styles.information, styles.horizontal]}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='hearto' type='AntDesign'
                                      style={[styles.icon, {color: ThemeConstants[theme].textColor, marginRight: 10}]}/>
                                <TextComponent
                                    style={[styles.lang, {color: ThemeConstants[theme].textColor}]}>{Locales.Favorite}</TextComponent>
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


                        {validateText(login) ?

                            <TouchableOpacity
                                onPress={this.signOut}
                                style={[styles.information, styles.horizontal]}>
                                <View style={{flexDirection: 'row'}}>
                                    <Icon name='logout' type='AntDesign'
                                          style={[styles.icon, {
                                              color: ThemeConstants[theme].textColor,
                                              marginRight: 10,
                                          }]}/>
                                    <TextComponent
                                        style={[styles.lang, {color: ThemeConstants[theme].textColor}]}>{Locales.Logout}</TextComponent>
                                </View>
                                <Icon name='right' type='AntDesign'
                                      style={[styles.icon, {
                                          color: ThemeConstants[theme].textColor,
                                          fontSize: setWidth('5%'),
                                      }]}/>
                            </TouchableOpacity>
                            : null
                        }
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.loginReducer.login,
    isDarkTheme: state.settingReducers.currentValue,
});
export default connect(mapStateToProps, {darkMode, checkLogin})(Profile);
