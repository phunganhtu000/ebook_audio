import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {styles} from '../style/style_Comment';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon, Input} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import {connect} from 'react-redux';
import {darkMode} from '../../../redux/actions/settingAction';
import {checkLogin} from '../../../redux/actions/loginAction';
import {ThemeConstants} from '../../../cores/theme/Theme';
import Locales from '../../../cores/languages/languages';
import {getDataOfflineMode, validateText} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import firebase from 'react-native-firebase';
import {firebaseConfig} from '../../../api/firebase/firebaseConfig';
import {postComment} from '../../../redux/actions/productAction';
// import { FlatList } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.firebase = firebaseConfig.database();
        this.state = {
            comment: '',
            viewRef: null,
            data: [],
        };
    }

    async componentDidMount() {
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

    navigateComment(data) {
        const id = this.props.navigation.state.params.data.id;
        const data1 = this.state.data;
        let da = {id: id, comment: data, username: data1.name};
        console.log('data data1: ' + JSON.stringify(data1.name));
        this.props.postComment(da);
        // postComment(comment)
        //     .then((responseJson) => {
        //         this.setState({
        //             isLoading: false,
        //             dataSource: responseJson,
        //         }, function () {
        //         });
        //     }).catch((error) => {
        //     console.error(error);
        // });
    }

    render() {
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        const {login} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <View style={styles.body}>
                    <FlatList
                        data={this.props.data[0].user_comments}
                        renderItem={({item}) =>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10,
                                width: '90%',
                            }}>
                                <FastImage
                                    source={{uri: 'https://yt3.ggpht.com/a/AGF-l799RR3CxLJyrEVhm8cplh4DLoB58UC3qfKqBQ=s900-mo-c-c0xffffffff-rj-k-no'}}
                                    style={styles.image}/>
                                <View style={{marginLeft: '2.5%', width: '80%'}}>
                                    <View style={styles.horizontal}>
                                        <TextComponent
                                            style={[styles.txtName, {color: ThemeConstants[theme].textColor}]}>{item.user_name}</TextComponent>
                                        <TextComponent
                                            style={{
                                                color: colors.color_text_second,
                                                fontSize: 13,
                                            }}>{item.dt_rate}</TextComponent>
                                    </View>
                                    <TextComponent
                                        style={{
                                            color: colors.color_text_second,
                                            fontSize: 14,
                                        }}>{item.comment_text}</TextComponent>
                                </View>
                            </View>}
                    />

                </View>
                {validateText(login) ?
                    <View style={[styles.viewallinput, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
                        <TextInput
                            style={[styles.input, {color: ThemeConstants[theme].textColor}]}
                            placeholderTextColor={ThemeConstants[theme].textColor}
                            placeholder={Locales.Comment2}
                            value={this.state.comment}
                            onChangeText={(comment) => {
                                this.setState({comment});
                            }}
                        />
                        <TouchableOpacity style={styles.toucoment}
                                          onPress={() => this.navigateComment(this.state.comment)}>
                            <Icon style={styles.iconcomment} type="Ionicons" name="md-send"/>
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity onPress={() => navigate('Login')} style={styles.viewTrong}>
                        <TextComponent style={styles.textTrong}>{Locales.logintocomment}</TextComponent>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.loginReducer.login,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {postComment, darkMode, checkLogin})(Comment);
