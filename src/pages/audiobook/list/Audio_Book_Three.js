import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ProgressBarAndroid,
  ProgressViewIOS,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from '../style/style_Three';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import {marginTop10, rowView} from '../../../cores/styles/styleView';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import {inValidateText, setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import {connect} from 'react-redux';
import {getDetail} from '../../../redux/actions/productAction';
import Constant from '../../../utils/Constant_Api';
import {medium} from '../../../cores/styles/styleText';

class AudioBookThree extends Component {
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
      audio: '',
      mp3: '',
    };

    this.video = Video;
  }

  changetext(text) {
    this.setState({text});
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
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
    // hours + ':' +

  }
  // audio(item) {
  //     this.setState({
  //         audio: item.title,
  //         mp3: item.audio_book,
  //         paused: !this.state.paused, pausedText: pausedText
  //
  //     })
  //     var pausedText = '';
  //     if (!this.state.paused) {
  //         pausedText = 'Play';
  //
  //         // always show controls
  //         if (this.timeoutHandle)
  //             clearTimeout(this.timeoutHandle);
  //     } else {
  //         pausedText = 'Pause';
  //
  //         // hide controls after 5s
  //         this.timeoutHandle = setTimeout(() => {
  //             this.setState({hideControls: true});
  //         }, 5000);
  //     }
  //
  //
  // }
  reloadData(id){
    this.props.getDetail(id);
  }
  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const image = `${Constant.images}`;
    // const urlAudio = data[0].book_file_url;
    // console.log("check data: " + JSON.stringify(urlAudio))
    // const titleAudio = data[0].book_title;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.viewDetail}>
              <FlatList
                data={this.props.data}
                renderItem={({item}) =>
                  <View style={{alignItems: 'center'}}>
                    <FastImage style={styles.image}
                               source={{uri: `${image}${item.book_cover_img}`}}>
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
                        </TouchableOpacity>
                        <View style={styles.itemPlay}>
                          <TextComponent style={styles.title}>{item.book_title}</TextComponent>
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
                      <Video
                        ref={(ref: Video) => {
                          this.video = ref;
                        }}
                        /* For ExoPlayer */
                        source={{uri: item.book_file_url}}
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
                    </FastImage>
                    <View style={{width: setWidth('100%'), marginTop: 20}}>
                      <TextComponent style={{...medium, marginLeft: 15}}>Sách liên quan</TextComponent>
                      <View style={styles.body2}>
                      <FlatList
                        // horizontal
                        // numColumns={2}
                        data={item.related_books}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() =>this.reloadData(item.id)}
                            style={styles.item}>
                            <View style={styles.viewId}>
                              <TextComponent></TextComponent>
                            </View>
                            <View style={styles.shadow}>
                              <FastImage style={[styles.imageItem]}
                                         source={{uri: `${image}${item.book_cover_img}`}}/>
                            </View>
                            <View style={styles.viewText}>
                              <TextComponent style={styles.text2}>{item.book_title}</TextComponent>
                              <View style={styles.horizontal2}>
                                <View style={styles.row}>
                                  <TextComponent
                                    style={[styles.textAuthor, {...marginTop10}]}>Published
                                    from </TextComponent>
                                  <TextComponent
                                    style={[styles.texttag, {...marginTop10}]}>{item.author_name}</TextComponent>
                                </View>
                                {/*<TextComponent style={styles.textAuthor}>00:50</TextComponent>*/}
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}/>
                      </View>
                    </View>
                  </View>
                }
              />

            </View>

          </View>
        </ScrollView>

      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    data: state.productReducers.detail,
    loading: state.productReducers.isFetching,
  };
}
export default connect(mapStateToProps, {getDetail})(AudioBookThree);
