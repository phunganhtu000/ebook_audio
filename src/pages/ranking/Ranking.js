import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ScrollView
} from 'react-native';

import HeaderComponent from '../headerComponent/HeaderComponent';
import Carousel from 'react-native-snap-carousel';
import FastImage from "react-native-fast-image";
import api from '../../api/offline/api'

const window = Dimensions.get('window').width;
import {
    getDataOfflineMode,
    inValidateText,
    setWidth
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {Icon} from "native-base";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {marginTop10, marginTop20} from '../../cores/styles/styleView';
import Locales from '../../assets/languages/languages';
import constants from '../../assets/constants';
import Styles from './styles/styles';
import Styles_Two from './styles/style_two';
import styles_three from './styles/style_three';

export default class Ranking extends Component {
    constructor(props) {
        super();
        this.state = {
            banner: [],
            styles: Styles.getSheet(false)
        };
        this._carousel = {};
    }

    componentDidMount() {
        this.setState({
            banner: api.banner,
        })
        this.changeStyle();
    }

    _renderItem({item, index}) {
        const styles = this.state.styles
        console.log("styles :" + JSON.stringify(styles))
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

    async changeStyle() {
        const rtl = await getDataOfflineMode(constants.isRTL)
        this.setState({
            isRTL: rtl
        })
        const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);
        // switch (change_style) {
        //     case constants.STYLE_BORDER:
        //         this.setState(
        //             {styles:styles})
        //     case constants.STYLE_BOX_SHADOW:
        //         this.setState(
        //             {styles:styles_three})
        //     case constants.STYLE_NON_BORDER:
        //         this.setState(
        //             {styles:styles_two})
        //     case constants.STYLE_NON_LINED:
        //         this.setState(
        //             {styles:styles_four})
        // }

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
        const styles = this.state.styles
        console.log("styles :" + JSON.stringify(styles))
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <HeaderComponent
                  left='true'
                    iconLeft='ios-menu'
                    iconRight='ios-search'
                    title={Locales.Ranking}/>
                <ScrollView>
                    <View>
                        <Carousel
                            ref={c => {
                                this._carousel = c;
                            }}
                            data={this.state.banner}
                            renderItem={this._renderItem.bind(this)}
                            onSnapToItem={index => this.setState({activeSlide: index})}
                            sliderWidth={window}
                            itemWidth={200}
                            layout={'default'}
                            firstItem={1}
                            loop={true}
                            loopClonesPerSide={1}
                            autoplay={true}
                            autoplayDelay={0}
                            autoplayInterval={5000}
                        />
                    </View>
                    <View style={styles.body}>
                        <View style={styles.e_book}>
                            <TextComponent style={styles.type}>{Locales.Top}</TextComponent>

                            <FlatList
                                // horizontal
                                // numColumns={2}
                                data={this.state.banner}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => navigate('Details', {item: item})}
                                        style={styles.item}>
                                        <View style={styles.viewId}>
                                            <TextComponent>{item.id}</TextComponent>
                                        </View>
                                        <View style={styles.shadow}>
                                            <FastImage style={[styles.imageItem]}
                                                       source={{uri: item.image}}/>
                                        </View>
                                        <View style={styles.viewText}>
                                            <TextComponent style={styles.text}>{item.title}</TextComponent>
                                            <View style={styles.horizontal}>
                                                <View style={styles.row}><TextComponent
                                                    style={[styles.textAuthor, {...marginTop10}]}>Published
                                                    from </TextComponent><TextComponent
                                                    style={[styles.texttag, {...marginTop10}]}>istudio</TextComponent>
                                                </View>
                                                {/*<TextComponent style={styles.textAuthor}>00:50</TextComponent>*/}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}/>

                        </View>
                        <View style={styles.book_audio}>

                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

