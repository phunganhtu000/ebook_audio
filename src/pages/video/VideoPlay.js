import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import { Tab, Tabs, ScrollableTab} from 'native-base';
import Util from './Utils'
import HeaderComponent from '../headerComponent/HeaderComponent';
import {getDataOfflineMode} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import Locales from '../../cores/languages/languages';
import ListTV from './tabTV/ListTV';
import Comment from './tabTV/Comment';
import Showtime from './tabTV/Showtimes';
import VideoPlayerScreen from './Video';
import Styles from './style/styles';
import constants from '../../assets/constants';
export default class VideoPlayerTV extends Component {
    constructor(props) {
        super(props);
        this.onLayout = this.onLayout.bind(this);
    }


    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl
        })


    }
    componentWillMount() {
        this.resizeVideoPlayer();
    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const data = this.props.navigation.state.params.item;
        const dataList = this.props.navigation.state.params.data;
        const styles = Styles.getSheet(this.state.isRTL)
        return (
            <View
                onLayout={this.onLayout}
                style={styles.containerVideo}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    title={data.title}
                    // typeIconRight='MaterialCommunityIcons'
                    // iconRight='dots-horizontal'
                    onPressLeft={() => navigation.goBack()}/>
                <VideoPlayerScreen

                    source={{uri: data.url}}
                    fullScreen={ ()=> navigate('VideoPlayerFull',{url: data.url})}
                     style={styles.viewvideo}
                    // controls={true}
                />
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#D0021B', height: 1}}
                      renderTabBar={() => <ScrollableTab style={{backgroundColor: '#fff', borderBottomWidth: 0}}/>}>
                    {/*<Tab tabStyle={{backgroundColor: '#fff'}}*/}
                    {/*     activeTabStyle={{backgroundColor: '#fff'}}*/}
                    {/*     textStyle={{color: '#C5C4C4'}}*/}
                    {/*     activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.Showtime}>*/}
                    {/*    <Showtime*/}
                    {/*        navigation={this.props.navigation}/>*/}
                    {/*</Tab>*/}
                    <Tab tabStyle={{backgroundColor: '#fff'}}
                         activeTabStyle={{backgroundColor: '#fff'}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.ListTV}>
                        <ListTV
                            data={dataList}
                            navigation={this.props.navigation}/>
                    </Tab>
                    <Tab tabStyle={{backgroundColor: '#fff'}}
                         activeTabStyle={{backgroundColor: '#fff'}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.Comment}>
                        <Comment navigation={this.props.navigation}/>
                    </Tab>
                </Tabs>
                {/* <ScrollView>
                   <View style={styles.body}>
                       <TextComponent style={styles.text}>I failed the first quarter of a class in school , so
                           i mad a face report card.
                           I did this every quarter that year. I forgot that they mail home the end-year cards,
                           and my mom go it beforeIculd intercept...Read more
                           I failed the first quarter of a class in school , so i mad a face report card.
                           I did this every quarter that year. I forgot that they mail home the end-year cards,
                           and my mom go it beforeIculd intercept...Read more
                           I failed the first quarter of a class in school , so i mad a face report card.
                           I did this every quarter that year. I forgot that they mail home the end-year cards,
                           and my mom go it beforeIculd intercept...Read more
                       </TextComponent>
                   </View>
                </ScrollView> */}
            </View>
        )
    }

    onPress() {
        if (this.videoPlayer != null)
            this.videoPlayer.presentFullscreenPlayer();
    }

    resizeVideoPlayer() {
        // Always in 16 /9 aspect ratio
        let {width, height} = Dimensions.get('window');
        if (Util.isPortrait()) {
            this.setState({
                orientationWidth: width,
                orientationHeight: width / 1.8,
            });
        } else {
            this.setState({
                orientationHeight: height,
                orientationWidth: height / 2
            });
        }
    }

    onLayout(e) {
        console.log('on layout called');
        this.resizeVideoPlayer();
    }
}
AppRegistry.registerComponent('VideoPlayer', () => VideoPlayer);
