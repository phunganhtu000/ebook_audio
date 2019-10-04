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
    Linking
} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import Styles from './styles/Styles';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import Locales from '../../assets/languages/languages';
import Mailer from 'react-native-mail';
import Rate, {AndroidMarket} from 'react-native-rate'
import {getDataOfflineMode, validateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import firebaseConfig from "firebase";
import global from '../../cores/utils/global';
import {connect} from "react-redux";
import {checkLogin} from '../../redux/actions/loginAction';

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

    async componentDidMount(): void {
        const rtl = await getDataOfflineMode(constants.isRTL)
        this.setState({
            isRTL: rtl
        })

    }

    signOut = () => {
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

                    })
                }
            })
        })
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
            }
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                    {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
                ],
                {cancelable: true}
            )
        });
    }

    openWeb() {
        this.props.navigation.navigate('WebViewComponent', {item: 'http://www.mozagroup.com/'})
        // Linking.openURL('http://www.mozagroup.com/');
    }

    openAbout() {
        this.props.navigation.navigate('WebViewComponent', {item: 'http://www.mozagroup.com/about.html'})
        // Linking.openURL('http://www.mozagroup.com/about.html');
    }


    render() {
        const styles = Styles.getSheet(this.state.isRTL)
        const {navigate} = this.props.navigation;
        const data = this.state.data;
        const {login} = this.props;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    title={Locales.Profile}/>
                <ScrollView>
                    <View style={styles.body}>
                        {validateText(login) ?
                            <TouchableOpacity
                                onPress={() => navigate('UpdateProfile')}
                                style={[styles.information, styles.horizontal]}>
                                <View>
                                    <TextComponent style={styles.name}>{data.name}</TextComponent>
                                    <TextComponent style={styles.email}>{data.email}</TextComponent>
                                </View>
                                <View>
                                    <FastImage style={styles.avatar}
                                               source={{uri: data.avatar}}
                                               resizeMode={FastImage.resizeMode.contain}/>
                                </View>
                            </TouchableOpacity> : null
                        }


                        <TouchableOpacity
                            onPress={() => navigate('Setting')}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.Setting}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigate('Downloads')}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.Downloads}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.openWeb()}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.frequently_asked_questions}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.openWeb()}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.MoreApps}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.openWeb()}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.Term_Conditions}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => navigate('Downloads')}
                            onPress={() => this.handleEmail()}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.Feedback}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => this.setState({ isModalOpen: true })}
                            onPress={() => {
                                let options = {
                                    AppleAppID: "2193813192",
                                    GooglePackageName: "com.econtent_ui",
                                    AmazonPackageName: "com.econtent_ui",
                                    OtherAndroidURL: "http://www.randomappstore.com/app/47172391",
                                    preferredAndroidMarket: AndroidMarket.Google,
                                    preferInApp: false,
                                    openAppStoreIfInAppFails: true,
                                    fallbackPlatformURL: "http://www.mywebsite.com/myapp.html",
                                }
                                Rate.rate(options, success => {
                                    if (success) {
                                        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                                        this.setState({rated: true})
                                    }
                                })
                            }}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.Rate_app}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.openAbout()}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.About_US}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={this.toggleModal}
                            style={[styles.information, styles.horizontal]}>
                            <View>
                                <TextComponent style={styles.lang}>{Locales.ChangePassword}</TextComponent>
                            </View>
                            <View>
                                <Icon name='ios-arrow-forward' style={styles.icon}/>
                            </View>
                        </TouchableOpacity>


                        {validateText(login) ?
                            <TouchableOpacity
                                onPress={this.signOut}
                                style={[styles.information, styles.horizontal]}>
                                <View>
                                    <TextComponent style={styles.lang}>{Locales.Logout}</TextComponent>
                                </View>
                                <View>
                                    <Icon name='ios-log-out' style={styles.icon}/>
                                </View>
                            </TouchableOpacity> : null
                        }
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
    login: state.loginReducer.login
})
export default connect(mapStateToProps, {checkLogin})(Profile);
