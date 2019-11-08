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
        // const {navigation} = this.props;
        this.data();
        // this.focusListener = navigation.addListener('didFocus', () => {
        //   this.data();
        // });
    }

    // componentWillUnmount() {
    //   this.focusListener.remove();
    //   if (this.unsubscribe) this.unsubscribe();
    // }

    data() {
        const user = this.props.user;
        const uid = this.props.user.uid;
        this.firebase.ref('user').on('value', dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                if (childData.uid === uid) {
                    this.props.navigation.navigate('Menu');
                    // console.log('uid if: ' + JSON.stringify(childData.uid));
                } else {
                    // console.log('uid else: ' + JSON.stringify(childData.uid));
                    // this.firebase.ref('user').child(uid).set({
                    //   email: user.email,
                    //   name: user.displayName,
                    //   avatar: user.photoURL,
                    //   phone: user.phoneNumber,
                    //   uid: user.uid,
                    // });
                    let data = {
                        email: user.email,
                        name: user.displayName,
                        avatar: user.photoURL,
                        phone: user.phoneNumber,
                        uid: user.uid,
                    };
                    this.props.navigation.navigate('UpdateProfile', {data});
                }
            });
        });
    }


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
