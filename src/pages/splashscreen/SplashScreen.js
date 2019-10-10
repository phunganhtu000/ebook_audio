import React, {Component} from 'react';
import {
    View, Text, StyleSheet, ImageBackground,
    Dimensions, StatusBar, NetInfo, Animated, Easing
} from 'react-native';

const window = Dimensions.get('window');
const screenHeight = window.height;
const screenWidth = window.width;
import {NavigationActions, StackActions} from 'react-navigation';
import darkTheme from '../../cores/viewComponents/themes/dark';
import lightTheme from '../../cores/viewComponents/themes/light';
import {
    getDataOfflineMode,
    inValidateText,
    setHeight
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import Locales from '../../assets/languages/languages';
import {colors} from '../../cores/styles/colors';

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login_token: '',
            languageArray: true,
            isRTL: false,
            marginTopAnim: new Animated.Value(0).__detach(),
        };
    }
    async componentDidMount() {
        this.getApiData();

        // const dataLanguage = await getDataOfflineMode(constants.LANGUAGE);
        // console.log('lang: '+ dataLanguage)
        // this.setState({
        //     getLanguage: dataLanguage,
        // });

        Locales.setLanguage('en');
        const isDarkMode =  false;
        if (inValidateText(isDarkMode) || isDarkMode === false) {
            // EStyleSheet.build(lightTheme);
            StatusBar.setBarStyle('dark-content');

            console.log('log :', isDarkMode)
        } else {
            // EStyleSheet.build(darkTheme);
            StatusBar.setBarStyle('light-content');
        }

    }

    disableLoading(value) {
        this.setState({
            isRefreshing: value,
            isLoading: value,
        });
    }



    async getApiData() {
        // const login_token = await getDataOfflineMode(constants.TOKEN);
        // console.log('token:' + login_token);
            setTimeout(() => {
                this.props.navigation.navigate('Login')
            }, 1000);

    }

    navigateLogin = (screen) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: screen})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        const {marginTopAnim} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {/*<FastImage style={styles.imageIcon} source={require('../../../assets/icon/ic_moza_logo.png')}*/}
                    {/*           resizeMode={FastImage.resizeMode.contain}/>*/}
                    <Text style={styles.title}>ECONTENTS</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        fontSize: 40,
        color: colors.green_text,
        marginTop: setHeight('2%'),
    },
    title30: {
        fontWeight: '600',
        fontSize: 30,
    },
    header: {
        alignItems: 'center'
    },
    imageIcon: {
        width: 80,
        height: 80,
        borderRadius: 5
    },

});
