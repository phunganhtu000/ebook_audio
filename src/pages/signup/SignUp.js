import React, {Component} from 'react';
//import react in our code.
import {Text, Image, ScrollView, View, TouchableOpacity, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {setHeight, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import Locales from '../../cores/languages/languages';
import {colors} from '../../cores/styles/colors';
import {Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.saf}>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <FastImage source={{uri: 'https://i.imgur.com/HVGmWAy.jpg'}} style={styles.image}/>
                        <View style={styles.body}>
                            <TouchableOpacity
                                style={[styles.tologin, {backgroundColor: '#3C5A98', marginBottom: setWidth('5%')}]}>
                                <Icon name='facebook' type='Entypo' style={styles.icon}/>
                                <TextComponent style={styles.textLogin}>{Locales.Loginwith} Facebook</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tologin, {backgroundColor: '#32CBFD'}]}>
                                <Icon name='twitter' type='Entypo' style={styles.icon}/>
                                <TextComponent style={styles.textLogin}>{Locales.Loginwith} Twitter</TextComponent>
                            </TouchableOpacity>
                            <TextComponent
                                style={[styles.textOr, {marginVertical: setWidth('7%')}]}>{Locales.or}</TextComponent>
                            <TextInput
                                style={styles.textInput}
                                placeholder={Locales.UserName}/>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={true}
                                placeholder={Locales.Password}/>
                            <TouchableOpacity
                                style={[styles.tologin, {backgroundColor: '#0099FF', marginTop: setWidth('2%')}]}>
                                <TextComponent style={styles.textLogin}>{Locales.SignUp}</TextComponent>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewBottom}>
                        <TextComponent style={styles.textOr}>{Locales.Alreadyaccount}</TextComponent>
                        <TouchableOpacity onPress={() => navigate('Login')}>
                            <TextComponent style={styles.textSinup}>{Locales.Login}</TextComponent>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>

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
});
