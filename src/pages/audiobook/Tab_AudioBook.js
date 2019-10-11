import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Tab, Container, TabHeading, Tabs, ScrollableTab} from 'native-base';
import AudioBookThree from './list/Audio_Book_Three';
import HeaderComponent from '../headerComponent/HeaderComponent';
import Locales from '../../cores/languages/languages';
import AudioBook from './list/AudioBook';
import Comment from './list/Comment';
import {connect} from 'react-redux';
import {getDetail} from '../../redux/actions/productAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class Tab_AudioBook extends Component {

    componentWillMount() {
        const data = this.props.navigation.state.params.data;
        this.props.getDetail(data.id);
    }

    render() {
        const navigations = this.props.navigation;
        const {navigation} = this.props;
        const {data, loading} = this.props;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    left='back'
                    typeIconRight='MaterialCommunityIcons'
                    iconRight='dots-horizontal'
                    title={Locales.AudioBook}
                    onPressLeft={() => navigation.goBack()}
                />
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#D0021B', height: 1}}
                      renderTabBar={() => <ScrollableTab
                          style={{backgroundColor: ThemeConstants[theme].backgroundCard, borderBottomWidth: 0}}/>}>
                    <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.NowPlay}>
                        <AudioBookThree data={data} navigation={navigations}/>
                    </Tab>
                    <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}}
                         heading={Locales.Infor}>
                        <AudioBook data={data} navigation={navigations}/>
                    </Tab>
                    <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.Comment}>
                        <Comment data={data} ww navigation={navigations}/>
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
    },
});

function mapStateToProps(state) {
    return {
        data: state.productReducers.detail,
        loading: state.productReducers.isFetching,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getDetail, darkMode})(Tab_AudioBook);

