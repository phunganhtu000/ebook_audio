import React, {Component} from 'react';
import {
    View, TouchableOpacity, Dimensions, Image, Modal, Platform, ImageBackground,
} from 'react-native';
import {
    marginRight5,
    paddingBottom5,
    rowView,
} from '../../cores/styles/styleView';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import api from '../../api/offline/api';
import FastImage from 'react-native-fast-image';
import {
    getDataOfflineMode,
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {Icon} from 'native-base';
import Styles from './stylePlaymusic';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import constants from '../../assets/constants';

const {width} = Dimensions.get('window');
export default class PlaYRadio extends Component {
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

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            data: api.music,
            isRTL: rtl,
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _renderItem({item, index}) {
        const styles = Styles.getSheet(this.state.isRTL);
        const {navigate} = this.props.navigation;
        return (
          <View style={[styles.ThumbnailBackgroundView, Platform.OS === 'ios' ? styles.shadow : null]}>

              <TouchableOpacity
                onPress={() => navigate('Details', {item: item})}
              >
                  <FastImage style={[styles.CarouselImage, styles.shadow]} source={{uri: item.image}}/>
                  {item.type === 'book_audio' ? <View style={styles.btnPlay}>
                      <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>
                  </View> : null}
              </TouchableOpacity>

          </View>

        );
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
        this.setState({paused: true, pausedText: 'Play'});
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
            if (this.timeoutHandle) {
                clearTimeout(this.timeoutHandle);
            }
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
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL);
        const {navigate} = this.props.navigation;
        return (
          <View style={styles.container}>
              <View style={styles.body}>
                  <View style={styles.viewplay}>
                      {/*<Icon style={styles.iconbar} type='Foundation' name='graph-bar'/>*/}
                      <FastImage style={styles.imageplay}
                                 source={{uri: this.props.avt}}>
                          <TouchableOpacity
                            onPress={() => this.onPressBtnPlay()}
                            style={styles.btnPlay}>
                              {this.state.pausedText === 'Play' ?
                                <Icon name='play' type='FontAwesome5' style={styles.iconplay}/> :
                                <Icon name='pause' type='FontAwesome' style={styles.iconplay}/>}
                          </TouchableOpacity>
                          {/*<TouchableOpacity>*/}
                          {/*<Icon style={styles.iconplay} type='FontAwesome5' name='play'/>*/}
                          {/*</TouchableOpacity>*/}
                      </FastImage>
                      <View style={styles.viewnamesinger}>
                          <TextComponent style={styles.textmusic}>{this.props.name}</TextComponent>
                          <TextComponent style={styles.textsinger}>{this.props.singer}</TextComponent>
                      </View>
                  </View>
                  <TouchableOpacity>
                      <Icon onPress={this.props.closeMusic} style={styles.iconclose} type='AntDesign' name='close'/>
                  </TouchableOpacity>
              </View>

              <Modal
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                  <View>
                      <ImageBackground style={styles.view}
                                       source={{uri: this.props.avt}}
                                       resizeMode='cover'
                                       blurRadius={5}>
                          <View style={styles.viewtopbar}>
                              <Icon onPress={() => {
                                  this.setModalVisible(false);
                              }} style={styles.icondown} type='Ionicons' name='ios-arrow-down'/>
                              <TextComponent style={styles.texttopbar}>CAST</TextComponent>
                              <Icon style={styles.icondown2} type='MaterialCommunityIcons'
                                    name='dots-horizontal'/>
                          </View>

                          <View style={styles.viewimageplay}>
                              <View style={styles.viewfastimage}>
                                  <FastImage style={styles.imageMedium} source={{uri: this.props.avt}}>
                                      <View style={styles.viewview}>
                                          <Icon name='md-headset' style={styles.icon}/>
                                          <TextComponent
                                            style={[styles.textMin2, {...marginRight5}]}>1000</TextComponent>
                                      </View>
                                  </FastImage>
                              </View>
                              <View style={styles.viewname}>
                                  <TextComponent style={[styles.titleItem, {...paddingBottom5}]}
                                                 numberOfLines={1}>{this.props.name}</TextComponent>
                                  <TextComponent style={[styles.textMin, {...paddingBottom5}]}
                                                 numberOfLines={1}>{this.props.singer}</TextComponent>
                                  {/*{*/}
                                  {/*this.state.data.map((item,index)=>{*/}
                                  {/*return(*/}
                                  {/*<View >*/}
                                  {/**/}
                                  {/*<TextComponent key={index} style={[styles.textMin, {...paddingBottom5}]}numberOfLines={1}>MIN</TextComponent>*/}
                                  {/*</View>*/}
                                  {/*)*/}
                                  {/*})*/}
                                  {/*}*/}

                              </View>
                              <View style={styles.viewicon}>
                                  <Icon style={styles.iconplay2} type='SimpleLineIcons' name='refresh'/>
                                  <Icon style={styles.iconplay2} type='FontAwesome5'
                                        name='angle-double-left'/>
                                  <TouchableOpacity
                                    onPress={() => this.onPressBtnPlay()}
                                    style={styles.btnPlay}>
                                      {this.state.pausedText === 'Play' ?
                                        <Icon name='play' type='FontAwesome5' style={styles.iconplay}/> :
                                        <Icon name='pause' type='FontAwesome' style={styles.iconplay}/>}
                                  </TouchableOpacity>
                                  <Icon style={styles.iconplay2} type='FontAwesome5'
                                        name='angle-double-right'/>
                                  <Icon style={styles.iconplay2} type='AntDesign' name='staro'/>
                              </View>
                              <Slider
                                step={20}
                                value={this.getCurrentTimePercentage()}
                                onValueChange={(sliderValue) => this.setState({sliderValue})}
                                style={styles.slideraudio}
                                maximumValue={100}
                                minimumValue={0}
                                minimumTrackTintColor="#00AE72"
                                maximumTrackTintColor="#000000"
                              />
                              <View style={styles.viewbottom}>
                                  <View style={styles.viewborder}>
                                      <Icon style={styles.icongift} type='FontAwesome' name='gift'/>
                                  </View>
                                  <View style={styles.viewiconbottom}>
                                      <View style={styles.viewborder}>
                                          <Icon style={styles.icongift} type='Ionicons' name='ios-share-alt'/>
                                      </View>
                                      <View style={[styles.viewborder, {marginLeft: 10, marginRight: 10}]}>
                                          <View style={{...rowView}}>
                                              <Icon style={styles.icongift} type='FontAwesome'
                                                    name='commenting'/>
                                          </View>
                                      </View>
                                      <View style={styles.viewborder}>
                                          <View style={{...rowView}}>
                                              <Icon style={styles.icongift} type='FontAwesome' name='heart'/>
                                          </View>
                                      </View>
                                  </View>
                              </View>
                          </View>
                      </ImageBackground>
                  </View>
              </Modal>
              <Video
                ref={(ref: Video) => {
                    this.video = ref;
                }}
                /* For ExoPlayer */
                source={{uri: this.props.music}}
                // source={require('./videos/tom_and_jerry_31.mp4')}
                // style={styles.fullScreen}
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
        );
    }
}

