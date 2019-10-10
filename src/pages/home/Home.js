import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import Styles from './styles/styles';
import {Container, Header, Tab, Tabs, ScrollableTab, TabHeading} from 'native-base';
import Ebook from './tab/Ebook';
import AudioBook from './tab/AudioBook';
import Locales from '../../assets/languages/languages';
import ListVideo from '../video/ListVideo';
import Radio from '../radio/Radio';
import api from '../../api/offline/api';
import ListMusic from '../music/ListMusic';
import Playmusic from '../music/playMusic/Playmusic';
import {
    getDataOfflineMode,
    inValidateText,
    setHeight,
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import HomeEbook from './tab/HomeEbook';
import constants from '../../assets/constants';
import HomeAudio from './tab/HomeAudio';
import {connect} from 'react-redux';
import {getDataHome} from '../../redux/actions/productAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            data2: [],
            changeTab: false,
            check: false,
            au: AudioBook,
            theme: Ebook,
        };
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            data: api.music,
            isRTL: rtl,
        });
    }

    async componentWillMount() {
        this.setState({
            data1: api.data1,
            data2: api.data2,
            music: api.music,
            radio: api.radio,
        });
        this.changeTheme();
        // const isrtl = await getDataOfflineMode(constants.isRTL)
        // if(isrtl ===true){
        //     GLOBAL.isRTL=this;
        // }else {
        //     GLOBAL.isRTL=false;
        // }
    }

    changeTabs(value) {
        this.setState({
            changeTab: value,
        });

    }

    async changeTheme() {
        const change_theme = await getDataOfflineMode(constants.CHANGE_THEME);

        this.setState({
            changetheme: change_theme,
        }, () => {
            if (inValidateText(this.state.changetheme)) {
                this.setState({
                    au: AudioBook,
                    theme: Ebook,

                });
            } else if (this.state.changetheme === 0) {
                this.setState({
                    au: AudioBook,
                    theme: Ebook,
                });
            } else if (this.state.changetheme === 1) {
                this.setState({
                    au: HomeAudio,
                    theme: HomeEbook,
                });
            }
        }, console.log('change_style :' + change_theme));

    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL);
        const data_book = this.state.data1;
        const data_bookAudio = this.state.data2;
        const navigation = this.props;
        const {navigate} = this.props.navigation;
        const music = this.state.music;
        const radio = this.state.radio;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={styles.container}>
                <HeaderComponent
                    left='true'
                    onPressRight={() => navigate('Search')}
                    iconRight='ios-search'
                    title={Locales.Home}/>

                <View style={{flex: 1}}>
                    <Tabs
                        locked={true}
                        tabBarUnderlineStyle={{backgroundColor: '#D0021B', height: 1}}
                        renderTabBar={() => <ScrollableTab
                            style={{backgroundColor: ThemeConstants[theme].backgroundCard, borderBottomWidth: 0}}/>}>
                        <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             textStyle={{color: '#C5C4C4'}}
                             activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.EBook}>
                            <HomeEbook
                                // data={getdatahome}
                                navigation={this.props.navigation}/>
                        </Tab>
                        <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             textStyle={{color: '#C5C4C4'}}
                             activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.AudioBook}>
                            <AudioBook
                                data={data_bookAudio}
                                navigation={this.props.navigation}/>
                        </Tab>
                        <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             textStyle={{color: '#C5C4C4'}}
                             activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.TVshow}>
                            <ListVideo navigation={this.props.navigation}/>
                        </Tab>
                        <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             textStyle={{color: '#C5C4C4'}}
                             activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.Radio}>
                            <Radio data={radio} navigation={this.props.navigation}/>
                        </Tab>
                        <Tab tabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             activeTabStyle={{backgroundColor: ThemeConstants[theme].backgroundCard}}
                             textStyle={{color: '#C5C4C4'}}
                             activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.Music}>
                            <ListMusic
                                data={music}
                                navigation={this.props.navigation}/>
                        </Tab>
                    </Tabs>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        getdatahome: state.productReducers.gethome,
        isFetching: state.productReducers.isFetching,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getDataHome, darkMode})(Home);
