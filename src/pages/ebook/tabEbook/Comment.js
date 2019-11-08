import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon, Input} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import Styles from '../styles/style_Comment';
import {
    getDataOfflineMode,
    inValidateText,
    setHeight,
    setWidth, validateText,
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import {connect} from 'react-redux';
import {getDetail} from '../../../redux/actions/productAction';
import saveDownload from '../../../api/saveDownload/saveData';
import Constant from '../../../utils/Constant_Api';
import ButtonBottom from '../../button/ButtonBottom';
import {darkMode} from '../../../redux/actions/settingAction';
import {checkLogin} from '../../../redux/actions/loginAction';
import {ThemeConstants} from '../../../cores/theme/Theme';
import Locales from '../../../cores/languages/languages';
// import { FlatList } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {NavigationActions, StackActions} from 'react-navigation';
import {postComment} from '../../../redux/actions/productAction';
import {firebaseConfig} from '../../../api/firebase/firebaseConfig';
import firebase from 'react-native-firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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

    componentWillMount() {
        const data = this.props.navigation.state.params.data;
        this.props.getDetail(data.id);

    }

    saveDownloadData() {
        const item = this.props.navigation.state.params.item;
        saveDownload(item);
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl,
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

    renderItem = ({item}) => {
        const styles = Styles.getSheet(this.state.isRTL);
        const image = `${Constant.images}`;
        // console.log("image: "+ JSON.stringify(image))
        const {navigate} = this.props.navigation;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';

        return (
            <View style={styles.viewall}>
                <FastImage
                    source={{uri: 'https://yt3.ggpht.com/a/AGF-l799RR3CxLJyrEVhm8cplh4DLoB58UC3qfKqBQ=s900-mo-c-c0xffffffff-rj-k-no'}}
                    style={styles.image}/>
                <View style={styles.viewpepo}>
                    <View style={styles.horizontal}>
                        <TextComponent
                            style={[styles.txtName, {color: ThemeConstants[theme].textColor}]}>{item.user_name}</TextComponent>
                        <TextComponent style={styles.txtcontent}>{item.comment_text}</TextComponent>
                    </View>
                    {/*<View style={{width: '20%'}}>*/}
                    {/*</View>*/}

                    <TextComponent style={{
                        color: colors.color_text_second,
                        fontSize: 13,
                    }}>{item.dt_rate}</TextComponent>
                </View>
            </View>
        );
    };

    navigateComment(data) {
        const id = this.props.navigation.state.params.data.id;
        const data1 = this.state.data;
        let da = {id: id, comment: data, username: data1.name};
        console.log('data data1: ' + JSON.stringify(data1.name));
        this.props.postComment(da);
    }

    render() {
        const {login} = this.props;
        const styles = Styles.getSheet(this.state.isRTL);
        const {data} = this.props;
        // console.log('dataaaa: ' + JSON.stringify(data[0].user_comments));
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        const {navigate} = this.props.navigation;
        const data1 = this.state.data;
        return (
            <KeyboardAwareScrollView>
                <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                    <View style={styles.body}>
                        <FlatList data={data[0].user_comments} renderItem={this.renderItem}/>
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
            </KeyboardAwareScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.productReducers.detail,
        isDarkTheme: state.settingReducers.currentValue,
        login: state.loginReducer.login,
    };
}

export default connect(mapStateToProps, {postComment, getDetail, darkMode, checkLogin})(Comment);


