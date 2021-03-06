import React, {Component} from 'react';
//import react in our code.
import {Text, Image, Alert, View, TouchableOpacity, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {setHeight, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import Locales from '../../cores/languages/languages';
import {colors} from '../../cores/styles/colors';
import {Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase';
import {firebaseConfig} from '../../api/firebase/firebaseConfig';
import {LoginManager, AccessToken, LoginButton} from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.refuser = firebaseConfig.database().ref('user');
        this.state = {
            myNumber: '',
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+84',
            confirmResult: null,
            address: '',
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user.toJSON()});
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+84',
                    confirmResult: null,
                });
            }
        });
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            //iosClientId: '872612520063-lm9n2o13k7tt0ri4evrbpn443d8gmhfk.apps.googleusercontent.com',
            webClientId: '872612520063-lm9n2o13k7tt0ri4evrbpn443d8gmhfk.apps.googleusercontent.com',

            offlineAccess: true,
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    signIn = () => {
        const {phoneNumber} = this.state;
        console.log('phone: ' + phoneNumber);
        this.setState({message: 'Sending code ...'});

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => this.setState({confirmResult, message: 'Code has been sent!'}))
            .catch(error => this.setState({message: `Sign In With Phone Number Error: ${error.message}`}));
    };
    confirmCode = () => {
        const {codeInput, confirmResult} = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({message: 'Code Confirmed!'});
                })
                .catch(error => this.setState({message: `Code Confirm Error: ${error.message}`}));
        }
    };

    login() {
        const {user, confirmResult} = this.state;
        this.refuser.child(user.uid).set({
            email: user.email,
            name: user.displayName,
            avatar: user.photoURL,
            phone: user.phoneNumber,
            uid: user.uid,
        });
        this.props.navigation.navigate('Confirm');

    }

    onLoginFb = () => {
        LoginManager
            .logInWithPermissions(['public_profile', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    return Promise.reject(new Error('the user cancelled the request'));
                }
                console.log(`login success with permissions: ${result.grantedPermissions.toString()}`);
                return AccessToken.getCurrentAccessToken();
            })
            .then(data => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                return firebase.auth().signInWithCredential(credential);
            })
            .then((currentUser) => {
                console.log(`Facebook login with user : ${JSON.stringify(currentUser.toJSON())}`);
            })
            .catch((error) => {
                console.log(`Facebook login with error : ${error}`);
            });
    };
    onLoginGoogle = () => {
        GoogleSignin.signIn().then((data) => {
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            return firebase.auth().signInWithCredential(credential);
        }).then((currentUser) => {
            console.log(`google login with user : ${JSON.stringify(currentUser.toJSON())}`);
        }).catch((error) => {
            console.log(`login fail with error: ${error}`);
        });
    };

    render() {
        const {user, confirmResult} = this.state;
        const {navigate} = this.props.navigation;
        const {phoneNumber} = this.state;
        return (
            <SafeAreaView style={styles.saf}>
                <KeyboardAwareScrollView>
                    {!user && !confirmResult && (
                        <View>
                            <View style={styles.container}>
                                <FastImage source={{uri: 'https://i.imgur.com/HVGmWAy.jpg'}} style={styles.image}/>
                                <View style={styles.body}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Locales.numberphone}
                                        underlineColorAndroid='transparent'
                                        // onChangeText={email => this.setState({email})}
                                        // returnKeyType='next'
                                        // onSubmxitEditing={() => {
                                        //     this.refs.txtPassWord.focus();
                                        // }}
                                        // value={this.state.email}
                                        autoFocus
                                        onChangeText={value => this.setState({phoneNumber: value})}
                                        value={phoneNumber}
                                        keyboardType={'numeric'}
                                    />
                                    {/*<TextInput*/}
                                    {/*    style={styles.textInput}*/}
                                    {/*    secureTextEntry={true}*/}
                                    {/*    placeholder={Locales.Password}*/}
                                    {/*    underlineColorAndroid='transparent'*/}
                                    {/*    onChangeText={password => this.setState({password})}*/}
                                    {/*    returnKeyType='go'*/}
                                    {/*    value={this.state.password}*/}
                                    {/*    ref={'txtPassWord'}*/}
                                    {/*    onSubmitEditing={() => {*/}
                                    {/*        this.login(this.state.email, this.state.password);*/}
                                    {/*    }}/>*/}
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.signIn();
                                        }}
                                        style={[styles.tologin, {
                                            backgroundColor: '#0099FF',
                                            marginTop: setWidth('2%'),
                                        }]}>
                                        <TextComponent style={styles.textLogin}>{Locales.Login}</TextComponent>
                                    </TouchableOpacity>
                                    <TextComponent
                                        style={[styles.textOr, {marginVertical: setWidth('7%')}]}>{Locales.or}</TextComponent>
                                    <TouchableOpacity
                                        onPress={() => this.onLoginFb()}
                                        style={[styles.tologin, {
                                            backgroundColor: '#3C5A98',
                                            marginBottom: setWidth('5%'),
                                        }]}>
                                        <Icon name='facebook' type='Entypo' style={styles.icon}/>
                                        <TextComponent
                                            style={styles.textLogin}>{Locales.Loginwith} Facebook</TextComponent>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.tologin, {backgroundColor: '#ca212a'}]}
                                                      onPress={() => this.onLoginGoogle()}>
                                        <Icon name='googleplus' type='AntDesign' style={styles.icon}/>
                                        <TextComponent
                                            style={styles.textLogin}>{Locales.Loginwith} Google</TextComponent>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/*<View style={styles.viewBottom}>*/}
                            {/*    <TextComponent style={styles.textOr}>{Locales.Donaccount}</TextComponent>*/}
                            {/*    <TouchableOpacity onPress={() => navigate('SignUp')}>*/}
                            {/*        <TextComponent style={styles.textSinup}>{Locales.SignUp}</TextComponent>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}
                            {this.renderMessage()}
                        </View>)}


                    {!user && confirmResult && this.renderVerificationCodeInput()}
                    {user && this.login()}
                </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }

    renderMessage() {
        const {message} = this.state;
        console.log('message: ' + message);
        if (!message.length) {
            return null;
        }

        return (
            <Text style={{padding: 5, backgroundColor: '#000', color: '#fff'}}>{message}</Text>
        );
    }

    renderVerificationCodeInput() {
        const {codeInput} = this.state;

        return (
            <KeyboardAwareScrollView>
                <View style={styles.container2}>
                    <Image source={require('../../assets/image/goodbye.jpg')} style={styles.imglogo}/>
                    <Text style={styles.texttitle}>{Locales.Enterthe6numbers}</Text>
                    <TextInput
                        autoFocus
                        style={styles.textCode}
                        onChangeText={value => this.setState({codeInput: value})}
                        keyboardType={'numeric'}
                        placeholder={Locales.Insertcode}
                        value={codeInput}
                    />
                    <TouchableOpacity
                        style={styles.btnConfirmCode}
                        onPress={() => this.confirmCode()}
                    >
                        <Text style={styles.textConfirmCode}>{Locales.Confirm}</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    saf: {flex: 1},
    container: {
        flex: 1,
        height: setHeight('90%'),
    },
    image: {
        width: setWidth('100%'),
        height: setWidth('50%'),
    },
    body: {
        paddingHorizontal: setWidth('8%'),
        marginTop: setWidth('10%'),
    },
    textInput: {
        width: setWidth('84%'),
        paddingLeft: setWidth('3%'),
        borderWidth: 0.2,
        borderColor: 'gray',
        height: setWidth('11%'),
        marginBottom: setWidth('5%'),
        borderRadius: 5,
    },
    tologin: {
        width: setWidth('84%'),
        height: setWidth('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    textLogin: {
        color: colors.white,
        fontSize: setWidth('4.2%'),
    },
    textOr: {
        fontSize: setWidth('4%'),
        textAlign: 'center',
    },
    icon: {
        color: colors.white,
        fontSize: setWidth('6.5%'),
        marginRight: setWidth('2%'),
    },
    viewBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // bottom: setWidth('5%'),
        // left: setWidth('21.5%'),
    },
    textSinup: {
        fontSize: setWidth('4%'),
        color: '#0099FF',
        marginLeft: setWidth('2%'),
    },
    container2: {
        flex: 1,
        // backgroundColor: colors.background,
        alignItems: 'center',
        paddingVertical: setWidth('10%'),
    },
    texttitle: {
        marginTop: setWidth('10%'),
        fontSize: 18,
    },
    textCode: {
        width: setWidth('75%'),
        height: setWidth('13%'),
        backgroundColor: colors.white,
        marginVertical: setWidth('5%'),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.background,
        color: colors.black,
        fontSize: 18,
        paddingHorizontal: setWidth('3%'),
    },
    btnConfirmCode: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: setHeight('10%'),
        backgroundColor: colors.blue,
        borderRadius: 5,
        width: setWidth('75%'),
        height: setWidth('13%'),
    },
    textConfirmCode: {
        color: colors.white,
        fontSize: 18,
    },
    inputphone: {
        marginHorizontal: setWidth('6%'),
        marginTop: 44,
        borderBottomWidth: 1,
        paddingBottom: 11,
        borderBottomColor: '#fff',
    },
    imglogo: {
        width: setWidth('80%'),
        height: setWidth('21%'),
    },
});
