import React, {Component} from 'react';
import {
    StyleSheet,
    View, TouchableOpacity, Dimensions,
} from 'react-native';
import {
    horizontalView,

} from '../../cores/styles/styleView';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {colors} from '../../cores/styles/colors';
import api from '../../api/offline/api';
import {Icon} from "native-base";
import {ifIphoneX} from "react-native-iphone-x-helper";
import Video from "react-native-video";

const {width} = Dimensions.get('window');
export default class PlayRadio extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            sliderValue: 0,
            modalVisible: false,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: false,
            pickerValueHolder: '1.0',
            pausedText: 'Play',
            hideControls: false,
        };
        this._carousel = {};
        this.video = Video;

    }

    componentDidMount() {
        this.setState({
            data: api.radio,
        })
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

        return hours + ':' + minutes + ':' + seconds;
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.fooder}>
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon style={styles.iconbar} type='Foundation' name='graph-bar'/>
                            <TextComponent style={{color: '#fff', fontSize: 18}}>{this.props.channels}</TextComponent>
                        </View>
                        <TextComponent
                            style={{color: '#fff', fontSize: 18, marginTop: 2}}>{this.props.name}</TextComponent>

                    </View>
                    <View style={{...horizontalView}}>
                        <TouchableOpacity
                            onPress={() => this.onPressBtnPlay()}
                            style={styles.btnPlay}>
                            {this.state.pausedText === 'Play' ?
                                <Icon name='play' type='FontAwesome5' style={styles.iconplay1}/> :
                                <Icon name='pause' type='FontAwesome' style={styles.iconplay1}/>}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon onPress={this.props.closeRadio} style={styles.iconclose} type='AntDesign'
                                  name='close'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Video
                    ref={(ref: Video) => {
                        this.video = ref
                    }}
                    source={{uri: this.props.radio}}
                    autoplay={true}
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
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    fooder: {
        backgroundColor: '#232830',
        ...
            ifIphoneX({
                height: 60,
                paddingLeft: 10,
                paddingRight: 10
            }, {
                height: 60,
                paddingLeft: 10,
                paddingRight: 10
            }),
        width: '100%',
        ...horizontalView,
    },
    iconbar: {
        color: "#fff",
        fontSize: 30,
        ...
            ifIphoneX({
                marginRight: 40
            }, {
                marginRight: 20
            }),
    },
    iconplay1: {
        color: "#fff",
        fontSize: 25,
        ...
            ifIphoneX({
                marginLeft: 40,
                marginRight: 40
            }, {
                marginLeft: 20,
                marginRight: 20
            }),
    },
    iconclose: {
        color: "#fff",
        fontSize: 25,
    }
})
