import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text, ScrollView, FlatList, Animated, TouchableOpacity, Dimensions
} from 'react-native';
import {
    marginRight5,
    marginTop10,
    marginTop20, paddingBottom5,
    rowView,
} from '../../cores/styles/styleView';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {colors} from '../../cores/styles/colors';
import api from '../../api/offline/api';
import FastImage from 'react-native-fast-image';
import {
    getDataOfflineMode, getStyleType,
    inValidateText, setHeight,
    setWidth,
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {Icon} from 'native-base';
import styles_three from './style/styleShawdown';
import styles_four from './style/styles_four';
import Styles from './style/styles';
import Styles_Two from './style/styleMusic';
import Playmusic from './playMusic/Playmusic';
import Locales from '../../assets/languages/languages';
import GLOBAL from '../../cores/utils/global';
import constants from '../../assets/constants';

const {width} = Dimensions.get('window');
export default class ListMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: Locales.Today,
            new: Locales.MusicNew,
            popular: Locales.Popular,
            data: [],
            banner: [],
            singer: [],
            modalVisible: false,
            check: false,
            music: '',
            singerName: '',
            songName: '',
            image: '',
            styles: Styles.getSheet(false),
        };
        this._carousel = {};
    }

    async componentDidMount() {

        this.setState({
            data: api.music,
            banner: api.banner,
            singer: api.singer,
        });
        setTimeout(() => {
            this.scrollView.scrollTo({x: -30});
        }, 1); // scroll view position fix
        this.changeStyle();

    }

    async changeStyle() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl,
        });
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
            changeStyle: change_style,
        }, () => {
            if (inValidateText(change_style)) {
                this.setState({
                    styles: Styles.getSheet(this.state.isRTL),
                });


            } else if (this.state.changeStyle === 0) {
                this.setState({
                    styles: Styles.getSheet(this.state.isRTL),
                });
            } else if (this.state.changeStyle === 1) {
                this.setState({
                    styles: Styles_Two.getSheet(this.state.isRTL),
                });
            } else if (this.state.changeStyle === 2) {
                this.setState({
                    styles: styles_three.getSheet(this.state.isRTL),
                });
            } else if (this.state.changeStyle === 3) {
                this.setState({
                    styles: styles_four.getSheet(this.state.isRTL),
                });
            }

        }, console.log('change_style :' + change_style));
        this.setState({
            // styles: getStyleType()
        });
    }


    render() {

        console.log('GLOBAL: ' + JSON.stringify(GLOBAL.isRTL));
        console.log('GLOBAL hhgch: ' + GLOBAL.isRTL);
        const styles = this.state.styles;
        const {navigate} = this.props.navigation;
        //const styles = Styles.getSheet(this.state.isRTL);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.viewItem}>
                        <View style={styles.itemHeader}>
                            <TextComponent style={styles.title}>{Locales.Today}</TextComponent>
                            <TextComponent onPress={() => navigate('ListItem', {item: this.state.today})}
                                           style={styles.textMin}>{Locales.More}</TextComponent>
                        </View>
                        <View style={styles.viewToday}>
                            <FlatList
                                inverted={this.state.isRTL}// scroll nguoc
                                // pagingEnabled'
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => this.setState({
                                        check: true,
                                        music: item.url,
                                        singerName: item.singer,
                                        songName: item.name,
                                        image: item.image,
                                    })}>
                                        <View style={styles.shadowcom}>
                                            <FastImage style={[styles.imageMax]} source={{uri: item.image}}>
                                                <Icon name='controller-play' type='Entypo'
                                                      style={{fontSize: 30, color: colors.white, margin: 5}}/>
                                            </FastImage>
                                        </View>
                                        <View style={styles.viewBottom}>
                                            <TextComponent style={styles.titleItem}
                                                           numberOfLines={1}>{item.name}</TextComponent>
                                            <TextComponent style={styles.textMin}
                                                           numberOfLines={1}>{item.singer}</TextComponent>
                                        </View>
                                    </TouchableOpacity>
                                )}/>
                        </View>
                    </View>
                    {/*singer*/}
                    <View style={[styles.viewItem, {...marginTop10}]}>
                        <View style={styles.itemHeader}>
                            <TextComponent style={styles.title}>{Locales.Topsingertd}</TextComponent>
                            {/*<TextComponent style={styles.textMin}>More</TextComponent>*/}
                        </View>
                        <View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                inverted={this.state.isRTL}// scroll nguoc
                                horizontal
                                data={this.state.singer}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => navigate('Singer', {item: item})}
                                                      style={styles.topSing}>
                                        <View style={[styles.viewSing, styles.shadowcom]}>
                                            <FastImage style={styles.imageSinger} source={{uri: item.image}}/>
                                            <FastImage style={styles.imgTop} source={{uri: item.top}}/>
                                        </View>
                                        <View style={styles.viewBottomSinger}>
                                            <TextComponent
                                                style={[styles.textMin, {textAlign: 'center'}]}>{item.singer}</TextComponent>
                                        </View>

                                    </TouchableOpacity>
                                )}/>
                        </View>
                    </View>
                    <View style={[styles.viewItem, {...marginTop10}]}>
                        <View style={styles.itemHeader}>
                            <TextComponent style={styles.title}>{Locales.Topmusictd}</TextComponent>
                            {/*<TextComponent style={styles.textMin}>More</TextComponent>*/}
                        </View>


                        <ScrollView
                            ref={(scrollView) => {
                                this.scrollView = scrollView;
                            }}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            style={styles.scrollView}
                            // decelerationRate={0}
                            snapToInterval={width - 25}
                            // snapToAlignment={"center"}
                            // contentInset={{
                            //     top: 0,
                            //     left: 5,
                            //     bottom: 0,
                            //     right: 5,
                            // }}
                        >
                            {this.state.data.map((item, index) => (
                                <View style={styles.view}>
                                    <TouchableOpacity onPress={() => this.setState({
                                        check: true,
                                        music: item.url,
                                        singerName: item.singer,
                                        songName: item.name,
                                        image: item.image,
                                    })}>
                                        <View style={[styles.rowView, {marginBottom: 20}]}>
                                            <View style={styles.shadowcom}>
                                                <FastImage style={styles.imageMedium} source={{uri: item.image}}/>
                                            </View>
                                            <View>
                                                <TextComponent style={[styles.titleItem, {...paddingBottom5}]}
                                                               numberOfLines={1}>{item.name}</TextComponent>
                                                <TextComponent style={[styles.textMin, {...paddingBottom5}]}
                                                               numberOfLines={1}>{item.singer}</TextComponent>
                                                <View style={{...rowView, ...paddingBottom5}}>
                                                    <View style={{...rowView}}>
                                                        <Icon name='md-headset' style={styles.icon}/>
                                                        <TextComponent
                                                            style={[styles.textMin, {...marginRight5}]}>{item.view}</TextComponent>
                                                    </View>
                                                    <View style={{...rowView}}>
                                                        <Icon name='ios-heart' style={styles.icon}/>
                                                        <TextComponent
                                                            style={styles.textMin}>{item.likesr}</TextComponent>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({
                                        check: true,
                                        music: item.url,
                                        singerName: item.singer,
                                        songName: item.name,
                                        image: item.image,
                                    })}>
                                        <View style={[styles.rowView, {marginBottom: 20}]}>
                                            <View style={styles.shadowcom}>
                                                <FastImage style={styles.imageMedium} source={{uri: item.image}}/>
                                            </View>
                                            <View>
                                                <TextComponent style={[styles.titleItem, {...paddingBottom5}]}
                                                               numberOfLines={1}>{item.name}</TextComponent>
                                                <TextComponent style={[styles.textMin, {...paddingBottom5}]}
                                                               numberOfLines={1}>{item.singer}</TextComponent>
                                                <View style={{...rowView, ...paddingBottom5}}>
                                                    <View style={{...rowView}}>
                                                        <Icon name='md-headset' style={styles.icon}/>
                                                        <TextComponent
                                                            style={[styles.textMin, {...marginRight5}]}>{item.view}</TextComponent>
                                                    </View>
                                                    <View style={{...rowView}}>
                                                        <Icon name='ios-heart' style={styles.icon}/>
                                                        <TextComponent
                                                            style={styles.textMin}>{item.likesr}</TextComponent>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            ))}


                        </ScrollView>
                    </View>

                    <View style={[styles.viewItem, {...marginTop10}]}>
                        <View style={styles.itemHeader}>
                            <TextComponent style={styles.title}>{Locales.MusicNew}</TextComponent>
                            <TextComponent onPress={() => navigate('ListItem', {item: this.state.new})}
                                           style={styles.textMin}>{Locales.More}</TextComponent>
                        </View>
                        <View>
                            <FlatList
                                // pagingEnabled
                                horizontal
                                inverted={this.state.isRTL}// scroll nguoc
                                showsHorizontalScrollIndicator={false}
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => this.setState({
                                        check: true,
                                        music: item.url,
                                        singerName: item.singer,
                                        songName: item.name,
                                        image: item.image,
                                    })}>
                                        <View style={styles.shadowcom}>
                                            <FastImage style={[styles.imageMax]} source={{uri: item.image}}>
                                                <Icon name='controller-play' type='Entypo'
                                                      style={{fontSize: 30, color: colors.white, margin: 5}}/>
                                            </FastImage>
                                        </View>
                                        <View style={styles.viewBottom}>
                                            <TextComponent style={styles.titleItem}
                                                           numberOfLines={1}>{item.name}</TextComponent>
                                            <TextComponent style={styles.textMin}
                                                           numberOfLines={1}>{item.singer}</TextComponent>
                                        </View>
                                    </TouchableOpacity>
                                )}/>
                        </View>
                    </View>
                    <View style={[styles.viewItem, {...marginTop10}]}>
                        <View style={styles.itemHeader}>
                            <TextComponent style={styles.title}>{Locales.Popular}</TextComponent>
                            <TextComponent onPress={() => navigate('ListItem', {item: this.state.popular})}
                                           style={styles.textMin}>{Locales.More}</TextComponent>
                        </View>
                        <View>
                            <FlatList
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => this.setState({
                                        check: true,
                                        music: item.url,
                                        singerName: item.singer,
                                        songName: item.name,
                                        image: item.image,
                                    })}
                                                      style={styles.viewliker}>
                                        <View style={styles.shadowcom}>
                                            <FastImage style={styles.imageMedium} source={{uri: item.image}}/>
                                        </View>
                                        <View>
                                            <TextComponent style={[styles.titleItem, {...paddingBottom5}]}
                                                           numberOfLines={1}>{item.name}</TextComponent>
                                            <TextComponent style={[styles.textMin, {...paddingBottom5}]}
                                                           numberOfLines={1}>{item.singer}</TextComponent>
                                            <View style={styles.viewview}>
                                                <View style={{...rowView}}>
                                                    <Icon name='md-headset' style={styles.icon}/>
                                                    <TextComponent
                                                        style={[styles.textMin, {...marginRight5}]}>{item.view}</TextComponent>
                                                </View>
                                                <View style={{...rowView}}>
                                                    <Icon name='ios-heart' style={styles.icon}/>
                                                    <TextComponent style={styles.textMin}>{item.likesr}</TextComponent>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}/>
                        </View>
                    </View>
                </ScrollView>
                {this.state.check == false ? null : <View style={styles.viewplay}>
                    <Playmusic
                        name={this.state.songName}
                        music={this.state.music}
                        avt={this.state.image}
                        singer={this.state.singerName}
                        closeMusic={() => this.setState({check: false})}
                        navigation={this.props.navigation}/>
                </View>}
            </View>
        );
    }
}
// const styles = EStyleSheet.create({
//     listItemContainer: {
//         flex: 1,
//         backgroundColor: '$bgColor',
//     },
//     viewToday: {
//         // ...marginComponent
//
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '$background'
//     },
//     viewItem: {
//         backgroundColor: '$bgColor'
//     },
//     itemHeader: {
//         ...marginhorizontal20,
//         // ...horizontalView
//         flexDirection: GLOBAL.isRTL === 'ar' ? 'row-reverse' : 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },
//     imgTop: {
//         width: 30,
//         height: 30,
//         position: 'absolute',
//         bottom: -10,
//         right: -30,
//     },
//     imageMax: {
//         width: setWidth('35%'),
//         height: setWidth('35%'),
//         ...marginLeft20,
//         borderRadius: 15,
//         justifyContent: GLOBAL.isRTL ? 'flex-end' : 'flex-start',
//         alignItems: 'flex-end'
//     },
//     viewBottom: {
//         ...marginLeft20,
//         width: setWidth('35%'),
//         marginTop: 5,
//         marginBottom: 10
//     },
//     title: {
//         fontSize: 16,
//         fontWeight: '500',
//         marginBottom: 5
//     },
//     titleItem: {
//         fontSize: 14,
//         ...titleComponent
//     },
//     textMin: {
//         fontSize: 12,
//         color: colors.color_text_second,
//         fontWeight: '500',
//
//     },
//     icon: {
//         fontSize: 15,
//         color: colors.mediumGray,
//         ...marginRight5
//     },
//     viewSing: {
//         width: setWidth('19%'),
//         height: setWidth('19%'),
//     },
//     imageSinger: {
//         width: setWidth('20%'),
//         height: setWidth('20%'),
//         borderRadius: setWidth('10%'),
//         ...marginLeft20,
//     },
//     viewBottomSinger: {
//         marginLeft: 20,
//         width: setWidth('20%'),
//         marginTop: 5,
//         marginBottom: 10,
//
//     },
//     //item 3
//     imageMedium: {
//         width: setWidth('20%'),
//         height: setWidth('20%'),
//         ...marginLeft10,
//         marginRight: 10,
//         borderRadius: 15,
//         // elevation: 5,
//         ...marginRight10
//     },
//     viewMaxHorizontal: {
//         ...marginLeft20,
//         marginBottom: 10
//     },
//     flatList: {
//         marginTop: 20,
//         flex: 1
//     },
//     view: {
//         width: width - 40,
//         margin: 5,
//         height: 200,
//
//         //paddingHorizontal : 30
//     },
//     viewplay: {
//
//         ...
//             ifIphoneX({
//                 height: setHeight('7%')
//             }, {
//                 height: setHeight('8%')
//             }),
//
//     }
//
// })

