import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import FastImage from "react-native-fast-image";
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import {Icon} from "native-base";
import Carousel from '../../../cores/viewComponents/slideShow';
import {
    getDataOfflineMode,
    inValidateText,
    setWidth
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import {colors} from '../../../cores/styles/colors';
import constants from '../../../assets/constants';
import Styles from '../styles/styleEbook';
import Styles_Two from '../styles/styleEbook_two';
import styles_three from '../styles/styleEbook_three';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = setWidth('45%');
const images = [
    "https://png.pngtree.com/thumb_back/fh260/back_pic/03/88/19/8457d4c36510ab4.jpg",
    "https://png.pngtree.com/thumb_back/fh260/back_pic/03/88/19/8457d4c36510ab4.jpg",
    "https://png.pngtree.com/thumb_back/fh260/back_pic/03/88/19/8457d4c36510ab4.jpg"
];
export default class HomeAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 5,
            styles: Styles.getSheet(false)

        };
    }
    async componentDidMount() {
        // this.setState({
        //     data: api.data,
        // })
        this.changeStyle();
    }
    renderPage(image, index) {
        return (
            <View key={index}>
                <FastImage style={{width: BannerWidth, height: BannerHeight}} source={{uri: image}}/>
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
        const data = this.props.data;
        const column1Data = data.filter((item, i) => i % 2 === 0);
        const column2Data = data.filter((item, i) => i % 2 === 1);
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => this.renderPage(image, index))}
                    </Carousel>
                    <View style={styles.body}>
                        <View style={styles.itemHeader}>
                            <TextComponent style={[styles.title, {fontSize: 20}]}>New</TextComponent>
                            <TextComponent onPress={() => navigate('ListItem', {item: this.state.today})}
                                           style={[styles.textMin, {fontSize: 15}]}>More</TextComponent>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={data}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => navigate('Details', {item: item})}
                                                  style={styles.topSing}>
                                    <FastImage style={styles.imageSinger} source={{uri: item.image}}>
                                        <View style={styles.time}>
                                            <TextComponent style={styles.textTime}>{item.time}</TextComponent>
                                        </View>
                                        <View style={styles.btnPlay}>
                                            <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>
                                        </View>
                                    </FastImage>
                                    <TextComponent
                                        style={[styles.title, {marginTop: 10}]}>{item.title}</TextComponent>
                                    <TextComponent
                                        style={[styles.txtDes]}>{item.author}</TextComponent>
                                    <View style={styles.rate}>
                                        <TextComponent
                                            style={[styles.textMin, {marginRight: 5}]}>$42.00</TextComponent>
                                        <View>
                                            <RatingBar
                                                disabled={false}
                                                maxStars={5}
                                                // selectedStar={(rating)=>this.onStarRatingPress(rating)}
                                                rating={this.state.starCount}
                                                starSize={12}
                                                fullStarColor={colors.orange}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}/>
                        <View style={[styles.itemHeader, {marginTop: 20}]}>
                            <TextComponent style={[styles.title, {fontSize: 20}]}>Popular Audio</TextComponent>
                            <TextComponent onPress={() => navigate('ListItem', {item: this.state.today})}
                                           style={[styles.textMin, {fontSize: 15}]}>More</TextComponent>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={data}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => navigate('Details', {item: item})}
                                                  style={styles.topSing}>
                                    <FastImage style={styles.imageSinger} source={{uri: item.image}}>
                                        <View style={styles.time}>
                                            <TextComponent style={styles.textTime}>{item.time}</TextComponent>
                                        </View>
                                        <View style={styles.btnPlay}>
                                            <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>
                                        </View>
                                    </FastImage>
                                    <TextComponent
                                        style={[styles.title, {marginTop: 10}]}>{item.title}</TextComponent>
                                    <TextComponent
                                        style={[styles.txtDes]}>{item.author}</TextComponent>
                                    <View style={styles.rate}>
                                        <TextComponent
                                            style={[styles.textMin, {marginRight: 5}]}>$42.00</TextComponent>
                                        <View>
                                            <RatingBar
                                                disabled={false}
                                                maxStars={5}
                                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                rating={this.state.starCount}
                                                starSize={12}
                                                fullStarColor={colors.orange}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

