import React, {Component} from 'react';
import {
    TouchableWithoutFeedback, Dimensions,
   View, StatusBar
} from 'react-native';
import Video from 'react-native-video';
// import ProgressBar from 'react-native-progress/Bar';
import {colors} from '../../cores/styles/colors';
import {Icon} from 'native-base'
// import Orientation from 'react-native-orientation';
import Styles from './style/styles';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {getDataOfflineMode} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';

export default class VideoPlayerScreen extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            paused: false,
            progress: 0,
            duration: 0,
            videoSource: '',
            isFullscreen: false,
            showControls: true,
        };
        this.handleMainButtonTouch = this.handleMainButtonTouch.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        //this.loadSourceFile=this.loadSourceFile.bind(this);
        this.handleFullScreenTouch = this.handleFullScreenTouch.bind(this);
        this.handleScreenTouch = this.handleScreenTouch.bind(this);
    }

    componentWillUpdate() {

    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl
        })


    }
        render()
        {
            const styles = Styles.getSheet(this.state.isRTL)
            const {width, height} = Dimensions.get("window");
            const heightmini = width * .5625;
            //console.log(width,height,heightmini);
            return (
                <View>
                    <View>
                        <TouchableWithoutFeedback onPress={this.handleScreenTouch}>
                            <Video
                                source={this.props.source}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                paused={this.state.paused}
                                style={{width: "100%", 'height': this.state.isFullscreen ? height : heightmini}}
                                resizeMode="contain"
                                onLoad={this.handleLoad}
                                onProgress={this.handleProgress}
                                onEnd={this.handleEnd}

                            />
                        </TouchableWithoutFeedback>

                        {this.state.showControls &&
                        <View style={styles.controls}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
                                    <Icon name={!this.state.paused ? "pause-circle" : "play-circle"}
                                          style={{color: colors.white, fontSize: 35}} type='MaterialCommunityIcons'/>
                                </TouchableWithoutFeedback>
                                <View style={styles.dot}>

                                </View>
                                <TextComponent style={{color: colors.white, marginLeft: 5}}>Live</TextComponent>
                            </View>


                            <TouchableWithoutFeedback onPress={this.props.fullScreen}>
                                <Icon name={!this.state.isFullscreen ? "fullscreen" : "fullscreen-exit"}
                                      type="MaterialCommunityIcons" style={{color: colors.white, fontSize: 35}}/>
                            </TouchableWithoutFeedback>

                        </View>
                        }

                    </View>
                </View>

            )
        }
        componentDidMount()
        {

        }
        handleScreenTouch()
        {
            if (this.state.showControls) {
                this.setState({showControls: false});

            } else {

                this.setState({showControls: true});
                if (this.state.paused) this.handleMainButtonTouch();
            }
        }
        handleFullScreenTouch()
        {

            this.setState({
                isFullscreen: !this.state.isFullscreen,
            });
            if (this.state.isFullscreen) {
                StatusBar.setHidden(false);
                // Orientation.lockToPortrait();
            } else {
                StatusBar.setHidden(true);
                // Orientation.lockToLandscape();
            }


        }
        handleProgressPress = e => {
            const position = e.nativeEvent.locationX;
            const progress = (position / 250) * this.state.duration;
            const isPlaying = !this.state.paused;

            this.player.seek(progress);
        };
        handleMainButtonTouch()
        {
            if (this.state.progress >= 1) {
                this.player.seek(0);
            }

            this.setState({
                paused: !this.state.paused,
            });
        }
        handleProgress(progress)
        {
            this.setState({
                progress: progress.currentTime / this.state.duration,
            });
        }
        handleEnd()
        {
            this.setState({paused: true});
        }
        ;
        handleLoad = meta => {
            this.setState({
                duration: meta.duration,
            });
        };
        secondsToTime(seconds)
        {
            var time = seconds % 60;
            time = (seconds - time) / 60 + ':' + time % 60;
            return time;
        }

    }

