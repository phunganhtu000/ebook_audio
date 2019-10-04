import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Modal,
    Alert,
    StatusBar,
    TouchableOpacity, Share
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon} from 'native-base';
import {Epub, Streamer} from 'epubjs-rn';
import TopBar from './view/TopBar'
import BottomBar from './view/BottomBar'
import Nav from './view/Nav'
import themes from './view/themes';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {horizontalView} from '../../cores/styles/styleView';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {getDataOfflineMode, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import Bookmark from './view/Bookmark';
import constants from '../../assets/constants';
import Styles from './styles/styles';

class EpubReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flow: "paginated", // paginated || scrolled-continuous
            location: 6,
            url: "https://s3.amazonaws.com/epubjs/books/moby-dick.epub",
            src: "",
            origin: "",
            title: "",
            toc: [],
            showBars: true,
            showNav: false,
            sliderDisabled: false,
            modalVisible: false,
            sliderValue: 15,
            sliderValue2: 20,
            backgroundEpub: 'light',
            TextHolder: 'Horizontal'
        };
        this.changeBackground = this.changeBackground.bind(this);
        this.streamer = new Streamer();
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl
        })
        this.streamer.start()
            .then((origin) => {
                this.setState({origin})
                return this.streamer.get(this.state.url);
            })
            .then((src) => {
                return this.setState({src});
            });

        setTimeout(() => this.toggleBars(), 1000);
    }


    componentWillUnmount() {
        this.streamer.kill();
    }

    toggleBars() {
        this.setState({showBars: !this.state.showBars});
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    changeBackground(backgroundEpub) {
        this.setState({backgroundEpub, modalVisible: false})
    }

    ChangeTextFunction = () => {
        this.setState({
            TextHolder: "Vertical",
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const styles = Styles.getSheet(this.state.isRTL)
        console.log('isRtl: ' + this.state.isRTL)
        return (
            <View style={styles.container}>
                <StatusBar hidden={!this.state.showBars}
                           translucent={true}
                           animated={false}/>
                <Epub style={styles.reader}
                      ref="epub"
                    //src={"https://s3.amazonaws.com/epubjs/books/moby-dick.epub"}
                      src={this.state.src}
                      flow={this.state.flow}
                      location={this.state.location}
                      onLocationChange={(visibleLocation) => {
                          console.log("locationChanged", visibleLocation)
                          this.setState({visibleLocation, bookmark: this.props.visibleLocation});
                      }}
                      onLocationsReady={(locations) => {
                          console.log("location total", locations.total);
                          this.setState({sliderDisabled: false});
                      }}
                      onReady={(book) => {
                          console.log("Metadata", book.package.metadata)
                          console.log("Table of Contents", book.package.toc)
                          this.setState({
                              title: book.package.metadata.title,
                              toc: book.navigation.toc
                          });
                      }}
                      onPress={(cfi, position, rendition) => {
                          this.toggleBars();
                          console.log("press", cfi);
                      }}
                      onLongPress={(cfi, rendition) => {
                          console.log("longpress", cfi);
                      }}
                      onViewAdded={(index) => {
                          console.log("added", index)
                      }}
                      beforeViewRemoved={(index) => {
                          console.log("removed", index)
                      }}
                      onSelected={(cfiRange, rendition) => {
                          console.log("selected", cfiRange)
                          // Add marker
                          rendition.highlight(cfiRange, {});
                      }}
                      onMarkClicked={(cfiRange) => {
                          console.log("mark clicked", cfiRange)
                      }}
                      themes={themes}
                      theme={this.state.backgroundEpub}
                      fontSize={50}
                      origin={this.state.origin}
                      onError={(message) => {
                          console.log("EPUBJS-Webview", message);
                      }}
                />
                <View
                    style={[styles.bar, {top: 0}]}>
                    <TopBar
                        title={this.state.title}
                        shown={this.state.showBars}
                        onback={() => navigation.goBack()}
                        onMenuPressed={() => this._nav.show()}
                        onRightButtonPressed={() => {
                            //     (value) => {
                            //         if (this.state.flow === "paginated") {
                            //             this.setState({flow: "scrolled-continuous"});
                            //         } else {
                            //             this.setState({flow: "paginated"});
                            //         }
                            //     }
                            this.setModalVisible(true);
                        }}
                    />
                    <Modal
                        transparent={true}
                        animationType={"slide"}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }}>
                        <View>
                            <View style={styles.ModalInsideView}>
                                <View style={styles.viewslder}>
                                    <Icon style={styles.icon} type='Entypo' name='adjust'/>
                                    <Slider
                                        step={1}
                                        value={this.state.sliderValue}
                                        onValueChange={(sliderValue) => this.setState({sliderValue})}
                                        style={{width: '75%', height: 40}}
                                        maximumValue={100}
                                        minimumValue={0}
                                        minimumTrackTintColor="#00AE72"
                                        maximumTrackTintColor="#000000"
                                    />
                                    <TextComponent style={styles.TextStyle}>{this.state.sliderValue}%</TextComponent>
                                </View>
                                <View style={styles.viewslder}>
                                    <TouchableOpacity>
                                        <Icon style={styles.icon} type='FontAwesome' name='font'/>
                                    </TouchableOpacity>
                                    <Slider
                                        step={1}
                                        value={this.state.sliderValue2}
                                        onValueChange={(sliderValue2) => this.setState({sliderValue2})}
                                        style={{width: '75%', height: 40}}
                                        maximumValue={100}
                                        minimumValue={0}
                                        minimumTrackTintColor="#00AE72"
                                        maximumTrackTintColor="#000000"
                                    />
                                    <TextComponent style={styles.TextStyle}>{this.state.sliderValue2}%</TextComponent>
                                </View>
                                <View style={styles.viewfont}>
                                    <TouchableOpacity style={styles.theme1}
                                                      onPress={() => this.changeBackground('light')}>
                                        <TextComponent style={styles.textabc}>abc</TextComponent>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.theme2}
                                                      onPress={() => this.changeBackground('tan')}>
                                        <TextComponent style={styles.textabc}>abc</TextComponent>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.theme3}
                                                      onPress={() => this.changeBackground('night')}>
                                        <TextComponent style={styles.textabc2}>abc</TextComponent>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.viewslder}
                                    // onPress={this.ChangeTextFunction}
                                                  onPress={
                                                      (value) => {
                                                          if (this.state.flow === "paginated") {
                                                              this.setState({flow: "scrolled-continuous"});
                                                          } else {
                                                              this.setState({flow: "paginated"});
                                                          }
                                                      }
                                                  }
                                >
                                    <Icon style={styles.icon} type='AntDesign' name='swap'/>

                                    <TextComponent style={styles.textabc}>{this.state.TextHolder} </TextComponent>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{height: '65%', width: '100%', backgroundColor: '#00000080'}}
                                              onPress={() => {
                                                  this.setModalVisible(false)
                                              }}/>

                        </View>
                    </Modal>

                </View>
                <View
                    style={[styles.bar, {bottom: 0}]}>
                    <BottomBar
                        disabled={this.state.sliderDisabled}
                        value={this.state.visibleLocation ? this.state.visibleLocation.start.percentage : 0}
                        shown={this.state.showBars}
                        onSlidingComplete={
                            (value) => {
                                this.setState({location: value.toFixed(6)})
                            }
                        }/>
                    {/*{console.log("location: " +JSON.stringify(this.state.bookmark))}*/}
                    {
                        console.log("percentage: " + JSON.stringify(this.state.visibleLocation))
                    }
                </View>
                <View>
                    <Nav ref={(nav) => this._nav = nav}
                         display={(loc) => {
                             this.setState({location: loc});
                         }}
                         toc={this.state.toc}
                    />
                    {console.log("toc: " + (this.state.location))}
                </View>

            </View>

        );
    }
}


export default EpubReader;
