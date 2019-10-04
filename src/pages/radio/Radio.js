import React, {Component} from 'react';
import {
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import FastImage from "react-native-fast-image";
import api from '../../api/offline/api'
import Video from "react-native-video";
import {getDataOfflineMode, inValidateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import styles_three from './style/style_three';
import Playmusic from '../music/playMusic/Playmusic';
import Styles from './style/Styles';
import Styles_Two from './style/style_two';
import GLOBAL from '../../cores/utils/global'

export default class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            check: false,
            pickerValueHolder: '1.0',
            pausedText: 'Play',
            styles: Styles.getSheet(false),
            data: [],
            radio: '',
            channels: '',
            name: ''

        },
            this.video = Video;
    }


    async componentDidMount() {
        this.setState({
            data: api.radio,
        })
        this.changeStyle();
    }


    // load video event
    onLoad = (data) => {
        this.setState({duration: data.duration});
    };

    // video is playing
    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
    };

    // video ends
    onEnd = () => {
        this.setState({paused: true, pausedText: 'Play'})
        this.video.seek(0);
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    onChangeRate(itemValue, itemIndex) {
        var rate = parseFloat(itemValue);
        this.setState({pickerValueHolder: itemValue, rate: rate});
    }

    // pressing on 'play' button
    onPressBtnPlay() {
        var pausedText = '';
        if (!this.state.paused) {
            pausedText = 'Play';

            // always show controls
            if (this.timeoutHandle)
                clearTimeout(this.timeoutHandle);
        } else {
            pausedText = 'Pause';

            // hide controls after 5s
            this.timeoutHandle = setTimeout(() => {
                this.setState({hideControls: true});
            }, 5000);
        }
        this.setState({paused: !this.state.paused, pausedText: pausedText});
    }

    // on press video event
    onPressVideo() {
        // showing controls if they don't show
        if (this.state.hideControls) {
            this.setState({hideControls: false});
            this.timeoutHandle = setTimeout(() => {
                this.setState({hideControls: true});
            }, 8000);
        }
    }

    // parse seconds to time (hour:minute:second)
    parseSecToTime(sec) {
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return minutes + ':' + seconds;
        // hours + ':' +

    }

    // setplayradio(item) {
    //     this.setState(
    //         {
    //             playradio: item.channels,
    //             nameradio: item.name,
    //             url: item.url,
    //         });
    // }

    async changeStyle() {
        const rtl = await getDataOfflineMode(constants.isRTL)
        this.setState({
            isRTL: rtl
        })
        const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);

        this.setState({
            changeStyle: change_style
        }, () => {
            if (inValidateText(change_style)) {
                this.setState({
                    styles: Styles.getSheet(this.state.isRTL)
                })


            } else if (this.state.changeStyle === 0) {
                this.setState({
                    styles: Styles.getSheet(this.state.isRTL)
                })
            } else if (this.state.changeStyle === 1) {
                this.setState({
                    styles: Styles_Two.getSheet(this.state.isRTL)
                })
            } else if (this.state.changeStyle === 2) {
                this.setState({
                    styles: styles_three.getSheet(this.state.isRTL)
                })
            } else if (this.state.changeStyle === 3) {
                this.setState({
                    styles: Styles.getSheet(this.state.isRTL)
                })
            }

        }, console.log("change_style :" + change_style))
        this.setState({
            // styles: getStyleType()
        })
    }


    render() {
        const {navigate} = this.props.navigation;
        console.log("GLOBAL: " + JSON.stringify(GLOBAL.isRTL))
        console.log("GLOBAL hhgch: " + GLOBAL.isRTL)
        const styles = this.state.styles
        //const styles = Styles.getSheet(this.state.isRTL)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        {/*<FlatList*/}
                        {/*    data={this.state.radio}*/}
                        {/*    renderItem={({item}) =>*/}
                        {/*        <View style={styles.viewflatl}>*/}
                        {/*            <TouchableOpacity style={{flexDirection: 'row'}}*/}
                        {/*                              onPress={() => this.setplayradio(item)}>*/}
                        {/*                <TextComponent style={styles.textname}>{item.channels}</TextComponent>*/}
                        {/*                <TextComponent style={styles.textname2}>{item.name}</TextComponent>*/}
                        {/*            </TouchableOpacity>*/}
                        {/*            <Icon style={styles.iconheart} type='AntDesign' name='hearto'/>*/}
                        {/*        </View>}*/}
                        {/*/>*/}

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => this.setState({
                                        check: true,
                                        radio: item.url,
                                        channels: item.channels,
                                        name: item.name,
                                        image: item.image
                                    })}
                                    style={styles.touchall}>
                                    <FastImage style={styles.imageview} source={{uri: item.image}}
                                               resizeMode={FastImage.resizeMode.contain}/>
                                </TouchableOpacity>
                            )}
                            numColumns={3}/>
                    </View>
                </ScrollView>
                {/*<View style={styles.fooder}>*/}
                {/*    <View>*/}
                {/*        <View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                {/*            <Icon style={styles.iconbar} type='Foundation' name='graph-bar'/>*/}
                {/*            <TextComponent style={{color: '#fff', fontSize: 18}}>{this.state.channels}</TextComponent>*/}
                {/*        </View>*/}
                {/*        <TextComponent*/}
                {/*            style={{color: '#fff', fontSize: 18, marginTop: 2}}>{this.state.name}</TextComponent>*/}

                {/*    </View>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => this.onPressBtnPlay()}*/}
                {/*        style={{flexDirection: 'row'}}>*/}
                {/*        /!*<Icon style={styles.iconplay} type='SimpleLineIcons' name='refresh'/>*!/*/}
                {/*        <Icon style={styles.iconplay1} type='FontAwesome' name='play'/>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                {/*{this.state.check == false ? null : <View style={styles.viewplay}>*/}
                {/*    <PlayRadio*/}
                {/*        name={this.state.name}*/}
                {/*        radio={this.state.radio}*/}
                {/*        channels={this.state.channels}*/}
                {/*        closeRadio={() => this.setState({check: false})}*/}
                {/*        navigation={this.props.navigation}/>*/}
                {/*</View>}*/}
                {this.state.check == false ? null : <View style={styles.viewplay}>
                    <Playmusic
                        name={this.state.name}
                        music={this.state.radio}
                        avt={this.state.image}
                        singer={this.state.channels}
                        closeMusic={() => this.setState({check: false})}
                        navigation={this.props.navigation}/>
                </View>}
            </View>
        );
    }
}

