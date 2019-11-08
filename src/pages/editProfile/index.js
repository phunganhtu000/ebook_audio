import React, {Component} from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Platform, ActivityIndicator,
} from 'react-native';
import {Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebaseDB from 'firebase';
import {styles} from './styles';
import Locales from '../../cores/languages/languages';
import {connect} from 'react-redux';
import {checkLogin} from '../../redux/actions/loginAction';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import TextComponent from '../../cores/viewComponents/text/TextComponent';

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const storage = firebaseDB.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const uploadImage = (uri, uid, mime = 'application/octet-stream') => {
    console.log('uri' + uri);
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        // let uploadBlob = null;
        const imageRef = storage.ref('avatar').child(`${uid}.jpg`);
        console.log('imageRef' + imageRef);
        fs.readFile(uploadUri, 'base64')
            .then(data => {
                return Blob.build(data, {type: `${mime};BASE64`});
            })
            .then(blob => {
                uploadBlob = blob;
                return imageRef.put(blob, {contentType: mime});
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then(url => {
                resolve(url);
            })
            .catch(err => {
                reject(err);
            });
    });
};

class EditProfile extends Component {
    constructor(props) {
        super();
        this.firebase = firebaseDB.database();
        this.state = {
            avatar: '',
            name: '',
            email: '',
            phone: '',
            birthday: '',
            address: '',
            uid: '',
            data: '',
            loadingImage: false,
        };
    }

    componentDidMount() {
        const {login} = this.props;
        this.firebase.ref('user').on('value', dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                if (childData.uid === login.uid) {
                    this.setState({
                        isLoading: true,
                        data: childData,
                        avatar: childData.avatar,
                        name: childData.name,
                        email: childData.email,
                        phone: childData.phone,
                        birthday: childData.birthday,
                        address: childData.address,
                        uid: childData.uid,
                    });
                }
            });
        });
    }

    imagePicker() {
        const {login} = this.props;
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                this.setState({loadingImage: true});
                uploadImage(response.uri, login.uid)
                    .then(url => {
                        this.setState({avatar: url});
                    })
                    .then(() => {
                        setTimeout(() => {
                            this.setState({loadingImage: false});
                        }, 3000);
                    })
                    .catch(err => {
                        this.setState({loadingImage: false});
                    });
            }
        });
    }

    update() {
        const {avatar, name, email, phone, birthday, address, uid} = this.state;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.name === '' | this.state.name === null) {
            Alert.alert(
                'chua nhap ten');
        } else if (this.state.email === '' | this.state.email === null) {
            Alert.alert(
                'chua nhap Email');
        } else if (reg.test(this.state.email) === false) {
            Alert.alert(
                'sai dinh dang Email');
        } else if (this.state.phone === '' | this.state.phone === null) {
            Alert.alert(
                'chua nhap Phone');
        } else if (this.state.birthday === '') {
            Alert.alert(
                'chua nhap ngay sinh');
        } else if (this.state.address === '') {
            Alert.alert(
                'chua nhap dia chi');
        } else {
            this.firebase.ref('user').child(uid).set({
                    uid: uid,
                    avatar: avatar,
                    name: name,
                    email: email,
                    phone: phone,
                    birthday: birthday,
                    address: address,
                }, () => this.props.navigation.navigate('Menu'),
            );
        }
    }

    render() {
        const {avatar, name, email, phone, birthday, address, data} = this.state;
        console.log('data: ' + avatar);
        return (
            <SafeAreaView style={styles.saf}>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <View style={styles.viewHeader}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.imagePicker();
                                }}
                                style={styles.touAvatar}>
                                {
                                    this.state.loadingImage ?
                                        <ActivityIndicator color="red" style={styles.avatar} size="large"/> :
                                        <Image style={styles.avatar} source={{uri: avatar}}/>
                                }
                                <View style={styles.viewCamera}>
                                    <Icon type="Entypo" name="camera" style={styles.iconCamera}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewBody}>
                            <View style={styles.viewInput}>
                                <TextComponent>{Locales.Name} : </TextComponent>
                                <TextInput
                                    onChangeText={name => this.setState({name})}
                                    value={name}
                                    placeholder="Enter name"
                                    returnKeyType={'next'}
                                    style={styles.textInput}
                                    onSubmitEditing={() => {
                                        this.secondTextInput.focus();
                                    }}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <TextComponent>Email : </TextComponent>
                                <TextInput
                                    onChangeText={email => this.setState({email})}
                                    value={email}
                                    placeholder="Enter Email"
                                    returnKeyType={'next'}
                                    style={styles.textInput}
                                    ref={input => {
                                        this.secondTextInput = input;
                                    }}
                                    onSubmitEditing={() => {
                                        this.threeTextInput.focus();
                                    }}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <TextComponent>{Locales.numberphone} : </TextComponent>
                                <TextInput
                                    onChangeText={phone => this.setState({phone})}
                                    value={phone}
                                    keyboardType={'numeric'}
                                    placeholder="Enter phone"
                                    returnKeyType={'next'}
                                    style={styles.textInput}
                                    ref={input => {
                                        this.threeTextInput = input;
                                    }}
                                    onSubmitEditing={() => {
                                        this.fourTextInput.focus();
                                    }}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <TextComponent>{Locales.Dateofbirth} : </TextComponent>
                                <TextInput
                                    onChangeText={birthday => this.setState({birthday})}
                                    value={birthday}
                                    placeholder="Enter your birthday"
                                    returnKeyType={'next'}
                                    style={styles.textInput}
                                    ref={input => {
                                        this.fourTextInput = input;
                                    }}
                                    onSubmitEditing={() => {
                                        this.fiTextInput.focus();
                                    }}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <TextComponent>{Locales.address} : </TextComponent>
                                <TextInput
                                    onChangeText={address => this.setState({address})}
                                    value={address}
                                    placeholder="Enter Address"
                                    returnKeyType="done"
                                    style={styles.textInput}
                                    ref={input => {
                                        this.fiTextInput = input;
                                    }}
                                />
                            </View>

                            <View style={styles.bottom}>
                                <TouchableOpacity
                                    onPress={() => this.update()}
                                    style={styles.touBottom}>
                                    <TextComponent style={styles.textBottom}>
                                        {Locales.Save}
                                    </TextComponent>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.loginReducer.login,
    };
}

export default connect(
    mapStateToProps,
    {checkLogin},
)(EditProfile);
