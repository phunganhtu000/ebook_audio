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
import {styles} from './styles/styles_audioBooks';
import HeaderComponent from '../headerComponent/HeaderComponent';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import api from '../../api/offline/api'
const window = Dimensions.get('window').width;
import {Icon} from 'native-base';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {marginTop10, marginTop20} from '../../cores/styles/styleView';

export default class AudioBooks extends Component {
    constructor(props) {
        super();
        this.state = {
            banner: []
        };
        this._carousel = {};
    }
    componentDidMount() {
        this.setState({
            banner: api.banner,
        })
    }
    _renderItem({item, index}) {

        return (
            <View style={[styles.ThumbnailBackgroundView, Platform.OS === 'ios' ? styles.shadow : null]}>

                <TouchableOpacity
                    onPress={() => {
                        console.log('clicked to index', index);
                        this._carousel.snapToItem(index);
                    }}
                >
                    <FastImage style={[styles.CarouselImage, styles.shadow]} source={{uri: item.image}}/>
                    {item.type === 'book_audio' ? <View style={styles.btnPlay}>
                        <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>
                    </View> : null}
                </TouchableOpacity>

            </View>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='ios-menu'
                    iconRight='ios-search'
                    title='Ranking'/>
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
                            <TextComponent style={styles.type}>NEW</TextComponent>
                            <TextComponent style={styles.title}>An Old Man is happy today,he doesn't
                                complain</TextComponent>
                            <View style={styles.row}><TextComponent style={styles.textAuthor}>Published
                                from </TextComponent><TextComponent
                                style={styles.texttag}>istudio</TextComponent></View>
                            <FlatList
                                // horizontal
                                // numColumns={2}
                                data={this.state.banner}
                                renderItem={({item}) => (
                                    <View style={styles.item}>
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
                                                <TextComponent style={styles.textAuthor}>00:50</TextComponent>
                                            </View>
                                        </View>
                                    </View>
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

