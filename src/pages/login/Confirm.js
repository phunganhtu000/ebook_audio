import React, {Component} from 'react';
import {View, Button, Text, TextInput, Image, TouchableOpacity, Alert} from 'react-native';
import {firebaseConfig} from '../../api/firebase/firebaseConfig';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';
import {connect} from 'react-redux';
import {checkLogin} from '../../redux/actions/loginAction';
import {inValidateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import Locales from '../../cores/languages/languages';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.firebase = firebaseConfig.database();
        this.state = {
            item: [],
        };
    }

    componentDidMount() {
        const {navigation} = this.props;

        this.data();
        this.focusListener = navigation.addListener('didFocus', () => {
            this.data();
        });

    }

    componentWillUnmount() {
        this.focusListener.remove();
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    data() {
        const uid = this.props.user.uid;
        this.firebase.ref(`user`).child(uid).on('value', snapshoot => {
            if (snapshoot.val()) {
                let obj = snapshoot.val();
                obj.key = snapshoot.key;
                this.setState({
                    item: obj,
                }, () => {
                    if (inValidateText(this.state.item.name)) {
                        console.log('name: ' + JSON.stringify(this.state.item.name));
                        this.goToUpdateProfile();
                    } else if (inValidateText(this.state.item.address)) {
                        console.log('adddd: ' + JSON.stringify(this.state.item.address));
                        this.goToUpdateProfile();
                    } else if (inValidateText(this.state.item.email)) {
                        console.log('email: ' + JSON.stringify(this.state.item.email));
                        this.goToUpdateProfile();
                    } else if (inValidateText(this.state.item.avatar)) {
                        console.log('avatar: ' + JSON.stringify(this.state.item.avatar));
                        this.goToUpdateProfile();
                    } else if (inValidateText(this.state.item.phone)) {
                        console.log('phone: ' + JSON.stringify(this.state.item.phone));
                        this.goToUpdateProfile();
                    } else if (inValidateText(this.state.item.birthday)) {
                        console.log('birthday: ' + JSON.stringify(this.state.item.birthday));
                        this.goToUpdateProfile();
                    } else {
                        this.props.navigation.navigate('Menu');

                    }
                });
            }
        });
    }

    goToUpdateProfile() {
        setTimeout(() => {
            this.props.navigation.navigate('UpdateProfile', {data: this.state.item});
        }, 2000);

    };


    render() {
        console.log('userchekc: ' + JSON.stringify(this.state.item));
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: successImageUri}} style={{width: 100, height: 100, marginBottom: 25}}/>
                <Text style={{fontSize: 25}}>{Locales.Loginsuccessful}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.loginReducer.login,
});
export default connect(mapStateToProps, {checkLogin})(Confirm);
