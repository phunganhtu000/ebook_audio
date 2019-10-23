import React, {Component} from 'react';
import {
    View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image,
} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import Locales from '../../cores/languages/languages';
import {h2, medium, small, small2} from '../../cores/styles/styleText';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {Icon} from 'native-base';
import {setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {horizontalView, marginLeft20, marginRight10, marginRight20} from '../../cores/styles/styleView';

import ImagePicker from 'react-native-image-picker';

export default class UpdateProfile extends Component {
    state = {
        avatarSource: null,
        videoSource: null,
    };

    constructor(props) {
        super();
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.selectVideoTapped = this.selectVideoTapped.bind(this);
        this.state = {};
    }


    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium',
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    videoSource: response.uri,
                });
            }
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    // iconRight='ios-search'
                    left='back'
                    title='UpdateProfile'
                    style={{...small}}
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.body}>
                    <ScrollView>
                        <View style={styles.imageall}>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                                              style={styles.touall}>
                                <Icon style={styles.icon} type='Entypo' name='camera'/>
                                <Image
                                    source={this.state.avatarSource}
                                    style={{width: 120, height: 120, borderRadius: 80}}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <Button title="Choose File" /> */}
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <View style={styles.viewuser}>
                                <LinearGradient
                                    colors={['#D0021B', '#fff']}
                                    start={{x: 1.25, y: 0}} end={{x: 1.25, y: 2.5}}
                                    style={styles.graicon}
                                >
                                    <Icon style={styles.inputIcon1} type='FontAwesome' name='user'/>
                                </LinearGradient>
                                <TextInput style={styles.inputuser}
                                           placeholder='name'/>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <View style={styles.viewuser}>
                                <LinearGradient
                                    colors={['#D0021B', '#fff']}
                                    start={{x: 1.25, y: 0}} end={{x: 1.25, y: 2.5}}
                                    style={styles.graicon}
                                >
                                    <Icon style={styles.inputIcon1} type='FontAwesome' name='mobile-phone'/>
                                </LinearGradient>
                                <TextInput style={styles.inputuser}
                                           placeholder='phone'/>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <View style={styles.viewuser}>
                                <LinearGradient
                                    colors={['#D0021B', '#fff']}
                                    start={{x: 1.25, y: 0}} end={{x: 1.25, y: 2.5}}
                                    style={styles.graicon}
                                >
                                    <Icon style={styles.inputIcon1} type='Entypo' name='location-pin'/>
                                </LinearGradient>
                                <TextInput style={styles.inputuser}
                                           placeholder='dia chi'/>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <TouchableOpacity style={styles.tousave} onPress={() => {
                                navigate('Menutab');
                            }}>
                                <LinearGradient
                                    colors={['#D0021B', '#E96273']}
                                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                    style={styles.graicon2}>
                                    <TextComponent style={styles.textsave}>Save</TextComponent>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {},
    imageall: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    touall: {
        width: setWidth('34%'),
        height: setWidth('34%'),
        backgroundColor: '#D5D8CE',
        borderRadius: setWidth('34%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        borderColor: '#BBBBBB',
        borderWidth: 1,
    },
    icon: {
        color: 'silver',
        // fontSize: 30,
        ...h2,
        position: 'absolute',
    },
    viewuser: {
        width: setWidth('80%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: setWidth('12%'),
        borderColor: 'silver',
        borderWidth: 0.2,
        borderRadius: setWidth('10%'),
        backgroundColor: '#fff',
    },
    tousave: {
        width: setWidth('80%'),
        ...horizontalView,
        alignItems: 'center',
        justifyContent: 'center',
        height: setWidth('12%'),
        borderRadius: setWidth('10%'),
        backgroundColor: '#fff',
    },
    graicon: {
        width: setWidth('8%'),
        height: setWidth('8%'),
        borderRadius: setWidth('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        ...marginRight10,
        ...marginLeft20,
    },
    graicon2: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: setWidth('10%'),
    },
    inputIcon1: {
        color: '#fff',
        // fontSize: 20,
        ...medium,
    },
    inputuser: {
        width: setWidth('65%'),
        borderRadius: setWidth('10%'),
        // fontSize: 15,
        ...small,
        ...marginRight20,
    },
    textsave: {
        color: '#fff',
        // fontSize: 15,
        ...small2,
        fontWeight: 'bold',
    },
});
