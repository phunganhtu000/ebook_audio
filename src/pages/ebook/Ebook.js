import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {styles} from './styles/styles';
import {Container, Header, Tab, Tabs, ScrollableTab, TabHeading} from 'native-base';
import Locales from '../../assets/languages/languages';
import api from '../../api/offline/api';
import Comment from './tabEbook/Comment';
import Infor from './tabEbook/Infor';
import {connect} from 'react-redux';
import {getSubCategory} from '../../redux/actions/productAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class Ebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            data2: [],
            changeTab: false,
        };
    }

    componentDidMount() {
        this.setState({
            data1: api.data1,
            data2: api.data2,
        });
    }

    changeTabs(value) {
        this.setState({
            changeTab: value,
        });

    }

    render() {
        const data_book = this.state.data1;
        const data_bookAudio = this.state.data2;
        const navigations = this.props.navigation;
        const {navigation} = this.props;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconRightStyle={{fontSize: 35}}
                    iconLeft='ios-arrow-back'
                    left='back'
                    typeIconRight='EvilIcons'
                    title={Locales.EBook}
                    iconRight='share-apple'
                    onPressLeft={() => navigation.goBack()}
                />
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#D0021B', height: 1}}
                      renderTabBar={() => <ScrollableTab
                          style={{backgroundColor: ThemeConstants[theme].backgroundCard, borderBottomWidth: 0}}/>}>
                    <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.E_book}>
                        <Infor
                            navigation={this.props.navigation}/>
                    </Tab>
                    <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.Comment}>
                        <Comment
                            navigation={this.props.navigation}/>
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getSubCategory, darkMode})(Ebook);
