import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import FastImage from "react-native-fast-image";
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import {Icon} from 'native-base';
import Carousel from '../../../cores/viewComponents/slideShow';
import {
    getDataOfflineMode,
    inValidateText,
    setWidth
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = setWidth('45%');
const images = [
    "https://png.pngtree.com/thumb_back/fh260/back_pic/03/88/19/8457d4c36510ab4.jpg",
    "https://png.pngtree.com/thumb_back/fh260/back_pic/03/88/19/8457d4c36510ab4.jpg",
    "https://png.pngtree.com/thumb_back/fh260/back_pic/03/88/19/8457d4c36510ab4.jpg"
];
import Styles from '../styles/styles';
import Styles_Two from '../styles/style_two';
import styles_three from '../styles/style_three';
import constants from '../../../assets/constants';
export default class AudioBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: Styles.getSheet(false)
        };

    }

    componentDidMount() {
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
                        <View style={styles.itemView}>
                            <View style={styles.column}>
                                <FlatList
                                    initialScrollIndex={false}
                                    data={column1Data}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            onPress={() => navigate('Details', {item: item})}
                                            style={styles.item}>
                                            <FastImage style={styles.image} source={{uri: item.image}}/>
                                            <View style={styles.time}>
                                                <TextComponent style={styles.textTime}>{item.time}</TextComponent>
                                            </View>
                                            <View style={styles.btnPlay}>
                                                <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            <View style={styles.column}>
                                <FlatList
                                    initialScrollIndex={false}
                                    data={column2Data}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            onPress={() => navigate('Details', {item: item})}
                                            style={styles.item}>
                                            <FastImage
                                                style={[styles.imageItemTwo]}
                                                source={{uri: item.image}}/>
                                            <View style={styles.time}>
                                                <TextComponent style={styles.textTime}>{item.time}</TextComponent>
                                            </View>
                                            <View style={styles.btnPlay}>
                                                <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

