import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import {colors} from '../../cores/styles/colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {Icon} from 'native-base';
import {getDataOfflineMode, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Styles from './styles/styles';
import FastImage from 'react-native-fast-image';
import {darkMode} from '../../redux/actions/settingAction';
import {connect} from 'react-redux';
import {ThemeConstants} from '../../cores/theme/Theme';
import firebase from 'react-native-firebase';
import {firebaseConfig} from '../../api/firebase/firebaseConfig';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.firebase = firebaseConfig.database();
        this.state = {
            bg: colors.purple,
            viewRef: null,
            data: [],
        };
    }

    async componentDidMount(): void {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl,
        });
        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        this.setState({
            bg: backgroundColor,
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

    render() {
        const styles = Styles.getSheet(this.state.isRTL);
        const color = this.state.bg;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        const data = this.state.data;
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
                <View style={[styles.body, styles.horizontal]}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.props.onPressLeft}>
                        {
                            this.props.left == 'true' ?
                                <FastImage style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 35 / 2,
                                    color: ThemeConstants[theme].textColor,
                                }}
                                           source={{uri: data.avatar}}
                                           resizeMode={FastImage.resizeMode.contain}/>
                                : null
                        }
                        {
                            this.props.left == 'back' ?
                                <Icon name={this.props.iconLeft} type={this.props.typeIconLeft}
                                      style={[styles.icon, {color: ThemeConstants[theme].textColor}]}/> : null
                        }

                    </TouchableOpacity>
                    <View>
                        <TextComponent
                            style={[styles.title, {color: ThemeConstants[theme].textColor}, this.props.style]}
                            numberOfLines={1}>{this.props.title}</TextComponent>
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.props.onPressRight}>
                        <Icon name={this.props.iconRight} type={this.props.typeIconRight}
                              style={[styles.icon, this.props.iconRightStyle, {color: ThemeConstants[theme].textColor}]}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.loginReducer.login,
    isDarkTheme: state.settingReducers.currentValue,
});

export default connect(mapStateToProps, {darkMode})(HeaderComponent);

