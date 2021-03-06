import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../home/Home';
import {Icon} from 'native-base';
import Profile from '../profile/Profile';
import Ranking from '../ranking/Ranking';
import {colors} from '../../cores/styles/colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import News from '../news/News';
import Category from '../category/Category';
import {getDataOfflineMode} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import {connect} from 'react-redux';
import {getSubCategory} from '../../redux/actions/productAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class Menu extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Home',
            bg: colors.purple,
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
    }

    render() {
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.saf, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
                {/*<StatusBar backgroundColor={colors.twitter} barStyle="dark-content"/>*/}

                {this.state.isRTL ?
                    <TabNavigator
                        tabBarStyle={styles.menu}>

                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Home'}
                            // title={strings.Profile}
                            renderIcon={() => <Icon name='home' type='AntDesign'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='home' type='AntDesign'
                                                            style={{fontSize: 30, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'Home'})}>
                            <Home navigation={this.props.navigation}/>

                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Ranking'}
                            renderIcon={() => <Icon name='barschart' type='AntDesign'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='barschart' type='AntDesign'
                                                            style={{fontSize: 30, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'Ranking'})}>
                            <Ranking navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Category'}
                            // title={strings.MyBook}
                            renderIcon={() => <Icon name='list' type='Entypo'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='list' type='Entypo'
                                                            style={{fontSize: 30, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'Category'})}>
                            <Category navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'News'}
                            // title={strings.MyBook}
                            renderIcon={() => <Icon name='newspaper-o' type='FontAwesome'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='newspaper-o' type='FontAwesome'
                                                            style={{fontSize: 28, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'News'})}>
                            <News navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Profile'}
                            // title={strings.Homes}
                            renderIcon={() => <Icon name='ios-contact' type='Ionicons'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='ios-contact' type='Ionicons'
                                                            style={{fontSize: 30, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'Profile'})}>
                            <Profile navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                    </TabNavigator>
                    :
                    <TabNavigator
                        tabBarStyle={[styles.menu, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>

                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Home'}
                            // title={strings.Profile}
                            renderIcon={() => <Icon name='home' type='AntDesign'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='home' type='AntDesign'
                                                            style={{fontSize: 30, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'Home'})}>
                            <Home navigation={this.props.navigation}/>

                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Ranking'}
                            renderIcon={() => <Icon name='barschart' type='AntDesign'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='barschart' type='AntDesign'
                                                            style={{fontSize: 30, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'Ranking'})}>
                            <Ranking navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Category'}
                            // title={strings.MyBook}
                            renderIcon={() => <Icon name='list' type='Entypo'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='list' type='Entypo'
                                                            style={{fontSize: 30, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'Category'})}>
                            <Category navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'News'}
                            // title={strings.MyBook}
                            renderIcon={() => <Icon name='newspaper-o' type='FontAwesome'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='newspaper-o' type='FontAwesome'
                                                            style={{fontSize: 28, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'News'})}>
                            <News navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Profile'}
                            // title={strings.Homes}
                            renderIcon={() => <Icon name='ios-contact' type='Ionicons'
                                                    style={{fontSize: 30, color: 'silver'}}/>}
                            renderSelectedIcon={() => <Icon name='ios-contact' type='Ionicons'
                                                            style={{fontSize: 30, color: '#D0021B'}}/>}
                            // badgeText="1"
                            onPress={() => this.setState({selectedTab: 'Profile'})}>
                            <Profile navigation={this.props.navigation}/>
                        </TabNavigator.Item>
                    </TabNavigator>
                }

                <View style={styles.bottom}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getSubCategory, darkMode})(Menu);
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: 'white',
        // ...ifIphoneX({
        //     marginBottom: 5,
        // }, {
        //     marginBottom: 0
        // })
        // marginBottom: Platform.OS === 'ios' ? 5 : 0,
    },
    bottom: {
        ...ifIphoneX({
            height: 20,
        }, {
            marginBottom: 0,
        }),
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.white,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    menu: {
        backgroundColor: 'white',
        paddingTop: 5,

    },
    icon: {
        fontSize: 30,
        color: colors.iOSBlue,
    },
    viewIcon: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        // fontFamily: 'Gill Sans',
    },
});
