//This is an example code for Bottom Navigation//
import React, {Component} from 'react';
//import react in our code.
import {
    Text,
    Platform,
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';
import {firebaseConfig} from '../../api/firebase/firebaseConfig';
import TextInputArea from '../../cores/viewComponents/textInput/TextInputArea';
import {horizontalView, horizontal} from '../../cores/styles/styleView';
import {inValidateText, setHeight, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
import {colors} from '../../cores/styles/colors';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import ButtonComponent from '../../cores/viewComponents/button/ButtonComponent';
import Locales from '../../cores/languages/languages';
import HeaderComponent from '../headerComponent/HeaderComponent';

const storage = firebaseConfig.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const uploadImage = (uri, uid, mime = 'application/octet-stream') => {
    // console.log('uri'+ uri);
    console.log('uid' + uid);
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        //let uploadBlob = null;

        const imageRef = storage.ref('avatar').child(`${uid}.jpg`);
        console.log('imageRef: ' + imageRef);
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mime};BASE64`});
            }).then((blob) => {
            uploadBlob = blob;
            return imageRef.put(blob, {contentType: mime});
        })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

class UpdateProfile extends Component {
    //Setting Screen to show in Setting Option
    constructor(props) {
        super(props);
        this.firebase = firebaseConfig.database();
        const data = this.props.navigation.state.params.data;
        this.state = {
            name: data.name,
            address: data.address,
            email: data.email,
            data: data,
            avatar: data.avatar,
            birthday: data.birthday,
            phone: data.phone,
            uid: data.uid,
        };
    }

    componentDidMount() {
        // const uid = this.props.user.uid;
        // this.firebase.ref(`user`).child(uid).on('value', snapshoot => {
        //     if (snapshoot.val()) {
        //         let obj = snapshoot.val();
        //         obj.key = snapshoot.key
        //         this.setState({
        //             data: obj,
        //             avatar: obj.avatar,
        //             name: obj.name,
        //             email: obj.email,
        //             birthday: obj.birthday,
        //             phone: obj.phone,
        //             address: obj.address,
        //             uid: obj.uid,
        //             loadingImage: false
        //         })
        //     }
        // })

    }

    imagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                this.setState({loadingImage: true});
                uploadImage(response.uri, this.props.user.uid)
                    .then(url => {
                        this.setState({avatar: url});
                    }).then(() => {
                    setTimeout(() => {
                        this.setState({loadingImage: false});
                    }, 3000);
                }).catch(err => {
                    this.setState({loadingImage: false});
                });
            }
        });
    }

    checkForm() {
        let {avatar, name, phone, address, uid, email, birthday} = this.state;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let user = {
            avatar: avatar,
            name: name,
            phone: phone,
            address: address,
            email: email,
            uid: uid,
            birthday: birthday,

        };
        if (inValidateText(this.state.name)) {
            Alert.alert(
                Locales.Nhapten);
        } else if (inValidateText(this.state.birthday)) {
            Alert.alert(
                Locales.Nhapngay);
        } else if (inValidateText(this.state.email)) {
            Alert.alert(
                Locales.NhapEmail);
        } else if (reg.test(this.state.email) === false) {
            Alert.alert(
                Locales.Emailincorrect);
        } else if (inValidateText(this.state.phone)) {
            Alert.alert(
                Locales.Nhapphone);
        } else if (inValidateText(this.state.address)) {
            Alert.alert(
                Locales.Nhapaddress);
        } else {
            this.addUserToFirebase(user);
        }
    }

    addUserToFirebase(user) {
        console.log('updateuser:' + JSON.stringify(user));

        this.firebase.ref('user').child(user.uid).update({
            avatar: user.avatar,
            name: user.name,
            phone: user.phone,
            address: user.address,
            email: user.email,
            uid: user.uid,
            birthday: user.birthday,

        }).then(() => {
            Alert.alert(
                Locales.Congratulations,
                Locales.Success,
                [
                    {
                        text: 'Ok', onPress: () => {
                            this.props.navigation.navigate('Menu');
                        },
                    },
                ],
            );
        }).catch((err) => {
            Alert.alert(
                err.message);
        });
    }

    update() {
        this.firebase.ref('user').child(this.state.uid).push({
            name: this.state.name,
        });
    }

    render() {
        const {navigation} = this.props;
        const {name, address, email, avatar, phone, surname, birthday} = this.state;
        // console.log('update:' + JSON.stringify(this.state.data))
        return (
            <SafeAreaView style={styles.saf}>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <HeaderComponent
                            iconLeft='ios-arrow-back'
                            left='back'
                            onPressLeft={() => navigation.goBack()}
                            title={Locales.updatedprofiles}/>
                        <View style={[styles.header, styles.horizontal]}>
                            <View/>
                            <TouchableOpacity onPress={() => {
                                this.imagePicker();
                            }}>
                                {this.state.loadingImage ?
                                    <ActivityIndicator color="red" style={styles.avatar} size="large"/> :
                                    <Image style={styles.avatar} source={{uri: avatar}}/>}
                                {/*<View style={styles.viewEdit}>*/}
                                {/*    <Icon name='edit' type='MaterialIcons' style={{color: colors.white, fontSize: 20}}/>*/}
                                {/*</View>*/}
                            </TouchableOpacity>
                            <View style={{width: setWidth('5%')}}/>
                        </View>


                        <View style={styles.viewUpdateUser}>


                            <View style={[{...horizontalView}, styles.itemUpdateUser]}>
                                <View>
                                    <TextComponent>{Locales.Name} : </TextComponent>
                                    <TextInputArea
                                        placeholder={Locales.Name}
                                        onChangeText={(name) => this.setState({name})}
                                        value={name}/>
                                </View>
                                {/*<Icon name='angle-right' type='FontAwesome' style={styles.icon}/>*/}
                            </View>
                            <View style={styles.barHorizontal}/>

                            <View style={[{...horizontalView}, styles.itemUpdateUser]}>
                                <View>
                                    <TextComponent>{Locales.Dateofbirth} :</TextComponent>
                                    <TextInputArea
                                        placeholder={Locales.Dateofbirth}
                                        onChangeText={(birthday) => this.setState({birthday})}
                                        value={birthday}/>
                                </View>
                            </View>
                            <View style={styles.barHorizontal}/>

                            <View style={[{...horizontalView}, styles.itemUpdateUser]}>
                                <View>
                                    <TextComponent>{Locales.Email} :</TextComponent>
                                    <TextInputArea
                                        placeholder={Locales.Email}
                                        onChangeText={(email) => this.setState({email})}
                                        value={email}/>
                                </View>
                            </View>
                            <View style={styles.barHorizontal}/>

                            <View style={[{...horizontalView}, styles.itemUpdateUser]}>
                                <View>
                                    <TextComponent>{Locales.numberphone} :</TextComponent>
                                    <TextInputArea
                                        placeholder={Locales.numberphone}
                                        maxLength={10}
                                        keyboardType={'numeric'}
                                        onChangeText={(phone) => this.setState({phone})}
                                        value={phone}/>
                                </View>
                                {/*<Icon name='angle-right' type='FontAwesome' style={styles.icon}/>*/}
                            </View>
                            <View style={styles.barHorizontal}/>
                            <View style={[{...horizontalView}, styles.itemUpdateUser]}>
                                <View>
                                    <TextComponent>{Locales.address} : </TextComponent>
                                    <TextInputArea
                                        placeholder={Locales.address}
                                        maxLength={10}
                                        keyboa08692633978rdType='number-pad'
                                        onChangeText={(address) => this.setState({address})}
                                        value={address}/>
                                </View>
                                {/*<Icon name='angle-right' type='FontAwesome' style={styles.icon}/>*/}
                            </View>
                            <View style={styles.barHorizontal}/>
                        </View>
                        <View style={styles.bottom}>
                            <ButtonComponent
                                style={{backgroundColor: colors.black}}
                                onPress={() => this.checkForm()}
                                text={Locales.Save}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginReducer.login,
    };
}

export default connect(mapStateToProps)(UpdateProfile);
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        // backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.white,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    horizontal: {
        ...horizontal,
    },
    icon: {
        fontSize: 25,
        color: colors.black,
    },
    avatar: {
        width: setWidth('30%'),
        height: setWidth('30%'),
        borderRadius: setWidth('35%'),
        backgroundColor: colors.background,
        //marginTop: setWidth('5%'),
    },
    viewEdit: {
        width: setWidth('7%'),
        height: setWidth('7%'),
        borderRadius: setWidth('3.5%'),
        backgroundColor: colors.orange,
        position: 'absolute',
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listViewTitle: {
        marginVertical: 20,
    },
    viewItem: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barVertical: {
        width: 0.5,
        height: setWidth('10%'),
        backgroundColor: colors.lightGrey,
        marginVertical: 8,
    },
    barHorizontal: {
        width: '100%',
        height: 0.5,
        backgroundColor: colors.lightGrey,

    },
    title: {
        marginVertical: 5,
        fontSize: 12,
        color: colors.black,
    },
    number: {
        color: colors.orange,
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewUpdateUser: {
        backgroundColor: colors.white,
        //marginTop: setWidth('5%'),

    },
    itemUpdateUser: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    bottom: {
        marginVertical: setHeight('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
