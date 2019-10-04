import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ProgressBarAndroid,
    ProgressViewIOS,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {styles} from '../style/style_Three';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon,} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import {rowView} from '../../../cores/styles/styleView';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import {inValidateText} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

export default class AudioBookThree extends Component {
    constructor(props) {
        super(props);

        // init state variables
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            check: '',
            pickerValueHolder: '1.0',
            pausedText: 'Play',
            hideControls: false,
            audio: "",
            mp3: "",
            banner: [
                {
                    id: 1,
                    image: 'https://izdesigner.net/wp-content/uploads/2017/07/su-dung-nghe-thuat-trong-thiet-ke-website-min.jpg',
                    title: 'An Old Man 1 ',
                    type: 'book_audio',
                    audio_book: 'http://www.sachnoionline.com/upload/admin/settings/THU_VIEN_15227418013780.mp3'
                },
                {
                    id: 2,
                    image: 'https://gotrangtri.vn/wp-content/uploads/2018/10/Tranh-nghe-thuat-dep-treo-tuong-phong-khach-GHS-6432-ava-400x600.jpg',
                    type: 'book',
                    title: 'An Old Man 2 ',
                    audio_book: 'http://www.sachnoionline.com/upload/files/THAT_TINH_KHONG_SAO_02.mp3'
                },
                {
                    id: 3,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTuSKjGefUpc34LD4ca0nC7s76wG6IU5Mf8__WbRXev_n0vA9',
                    title: 'An Old Man 3',
                    type: 'book_audio',
                    audio_book: 'http://www.sachnoionline.com/upload/admin/settings/THU_VIEN_15227418013780.mp3'

                },
                {
                    id: 4,
                    image: 'http://thuvienngontinh.com/wp-content/uploads/2014/11/tich_mich.jpg',
                    title: 'An Old Man 4 ',
                    type: 'book',
                    audio_book: 'http://www.sachnoionline.com/upload/admin/settings/THU_VIEN_15227418013780.mp3'

                }, {
                    id: 5,
                    image: 'https://izdesigner.net/wp-content/uploads/2017/07/su-dung-nghe-thuat-trong-thiet-ke-website-min.jpg',
                    title: 'An Old Man 5 ',
                    type: 'book_audio',
                    audio_book: 'http://www.sachnoionline.com/upload/admin/settings/THU_VIEN_15227418013780.mp3'
                },
                {
                    id: 6,
                    image: 'https://gotrangtri.vn/wp-content/uploads/2018/10/Tranh-nghe-thuat-dep-treo-tuong-phong-khach-GHS-6432-ava-400x600.jpg',
                    title: 'An Old Man 6 ',
                    type: 'book',
                    audio_book: 'http://www.sachnoionline.com/upload/admin/settings/THU_VIEN_15227418013780.mp3'
                },
                {
                    id: 7,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTuSKjGefUpc34LD4ca0nC7s76wG6IU5Mf8__WbRXev_n0vA9',
                    title: 'An Old Man 7 ',
                    type: 'book',
                    audio_book: 'http://www.sachnoionline.com/upload/admin/settings/THU_VIEN_15227418013780.mp3'

                },
                {
                    id: 8,
                    image: 'http://thuvienngontinh.com/wp-content/uploads/2014/11/tich_mich.jpg',
                    title: 'An Old Man ',
                    type: 'book_audio',
                    audio_book: 'http://www.sachnoionline.com/upload/admin/settings/THU_VIEN_15227418013780.mp3'

                },
            ],

        };

        this.video = Video;
    }

    changetext(text) {
        this.setState({text})
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

    componentDidMount(): void {
        const item = this.props.navigation.state.params.item;
        const data = this.state.banner.map(function (audio) {
            return{
                key:audio.title,
                url:audio.audio
            }
        })
        this.setState({
            title: data[0].title,
            url: data[0].url
        })

    }

    audio(item) {
        this.setState({
            audio: item.title,
            mp3: item.audio_book,
            paused: !this.state.paused, pausedText: pausedText

        })
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


    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        // const uri = this.state.dataAudio.url;
        const data = this.props.navigation.state.params.item;
        const urlAudio = data.track[0].audio_book;
        // console.log("check data: " + JSON.stringify(urlAudio))
        const titleAudio = data.track[0].title
        return (
            <View style={styles.container}>

                <Modal
                    isVisible={this.state.visibleModal === 'swipeable'}
                    onSwipeComplete={() => this.setState({visibleModal: null})}
                    swipeDirection={['down']}
                >
                    <View style={{
                        backgroundColor: '#fff', justifyContent: 'center',
                        alignItems: 'center', width: '100%', height: '100%'
                    }}>
                        {/*<AudioBookTwo/>*/}
                    </View>
                </Modal>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.viewDetail}>
                            <FastImage style={styles.image}
                                       source={{uri: data.image}}>
                                <View style={styles.viewPlay}>
                                    <TouchableOpacity
                                        onPress={() => this.onPressBtnPlay()}
                                        style={styles.btnPlay}>
                                        {this.state.pausedText === 'Play' ?
                                            <Icon name='play' type='FontAwesome5' style={styles.iconBlack}/> :
                                            <Icon name='pause' type='FontAwesome' style={styles.iconPause}/>}
                                    </TouchableOpacity>
                                    <View style={styles.time}>
                                        <TextComponent
                                            style={styles.textTime}>{this.parseSecToTime(parseInt(this.state.duration))}</TextComponent>
                                    </View>
                                    <TouchableOpacity
                                        // onPress={() => this.setState({ visibleModal: 'swipeable' })}
                                        style={styles.btnZoom}>
                                        <Icon name='arrowsalt' type='AntDesign' style={styles.iconZoom}/>
                                    </TouchableOpacity>
                                    <View style={styles.itemPlay}>
                                        <TextComponent style={styles.title}>Chapter 2
                                            : {inValidateText(this.state.audio)?titleAudio:this.state.audio} </TextComponent>
                                        <View style={{...rowView}}>
                                            <TextComponent
                                                style={styles.textTime}>{this.parseSecToTime(parseInt(this.state.currentTime))}</TextComponent>
                                            <View style={styles.marginLeft}>
                                                {
                                                    (Platform.OS === 'android')
                                                        ?
                                                        (<ProgressBarAndroid progress={this.getCurrentTimePercentage()}
                                                                             styleAttr="Horizontal"
                                                                             indeterminate={false}
                                                                             color={colors.red}/>)
                                                        :
                                                        (<ProgressViewIOS progress={this.getCurrentTimePercentage()}
                                                                          trackTintColor={colors.background}
                                                                          progressTintColor={colors.red}/>)
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </FastImage>
                        </View>

                        <View style={[styles.marginTop30, styles.viewMagin10]}>
                            <View style={styles.row}>
                                <TextComponent style={styles.textReview}>4.7</TextComponent>
                                <View style={[styles.row, {marginLeft: 10, paddingRight: 5}]}>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                </View>
                            </View>


                            <FlatList
                                // horizontal
                                data={data.track}
                                keyExtractor={this._keyExtractor}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={[styles.marginTop30, {...rowView, paddingLeft: 2}]}
                                                      onPress={() => this.audio(item)}>

                                        <View style={styles.btnPlay}>
                                            <Icon name='play' type='FontAwesome5' style={styles.iconBlack}/>
                                        </View>
                                        <View style={styles.itemPlayList}>
                                            <TextComponent style={styles.titleList}>{item.title}</TextComponent>
                                            <View style={{...rowView}}>
                                                <TextComponent>9:15</TextComponent>
                                                <View style={styles.slideList}>
                                                    {
                                                        (Platform.OS === 'android')
                                                            ?
                                                            (<ProgressBarAndroid
                                                                progress={this.state.progressBarProgress}
                                                                styleAttr="Horizontal" indeterminate={false}
                                                                color={colors.red}/>)
                                                            :
                                                            (<ProgressViewIOS progress={0.5}
                                                                              trackTintColor={colors.background}
                                                                              progressTintColor={colors.red}/>)
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />

                        </View>
                    </View>
                </ScrollView>
                <Video
                    ref={(ref: Video) => {
                        this.video = ref
                    }}
                    /* For ExoPlayer */
                    source={{uri: inValidateText(this.state.mp3)?urlAudio:this.state.mp3}}
                    // source={require('./videos/tom_and_jerry_31.mp4')}
                    style={styles.fullScreen}
                    rate={this.state.rate}
                    paused={this.state.paused}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    resizeMode={this.state.resizeMode}
                    onLoad={this.onLoad}
                    onProgress={this.onProgress}
                    onEnd={this.onEnd}
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                    onAudioFocusChanged={this.onAudioFocusChanged}
                    repeat={false}
                />
            </View>
        );
    }
}


