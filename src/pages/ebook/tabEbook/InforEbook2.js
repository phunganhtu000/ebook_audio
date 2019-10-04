import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import Styles from '../../details/styles/style';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import ButtonBottom from '../../button/ButtonBottom';
import Locales from '../../../assets/languages/languages';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import api from '../../../api/offline/api';
import {marginhorizontal} from '../../../cores/styles/styleView';
import {titleItem} from '../../../cores/viewComponents/text/texts';
import {
    getDataOfflineMode,
    inValidateText,
    setHeight,
    setWidth
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';

export default class InforEbook2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
        };
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            data1: api.data1,
            isRTL: rtl
        })
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL)
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const item = this.props.data
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{...marginhorizontal, marginTop: 10}}>
                        <View style={styles.header}>
                            <View>
                                <FastImage style={styles.avatar} source={{uri: item.image}}/>
                            </View>
                            <View style={styles.right_header}>
                                <TextComponent style={{...titleItem}}>{item.title}</TextComponent>
                                <TextComponent style={styles.author}>{item.author}</TextComponent>
                                <TextComponent style={styles.rating_text}>Users Rating</TextComponent>
                                <RatingBar
                                    disabled={false}
                                    maxStars={5}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    rating={this.props.star}
                                    starSize={20}
                                    fullStarColor={colors.orange}/>
                                <TextComponent>Folowing Tags</TextComponent>
                                <View style={[styles.row, {marginTop: 5}]}>
                                    <View style={styles.tag}>
                                        <TextComponent style={styles.txtTag}>#children's</TextComponent>
                                    </View>
                                    <View style={styles.tag}>
                                        <TextComponent style={styles.txtTag}>#fairytale</TextComponent>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.horizontal, styles.download]}>
                            <View>
                                <TextComponent style={styles.txtRate}>Rating</TextComponent>
                                <View style={styles.horizontal}>
                                    <TextComponent style={styles.title}>{this.props.star}</TextComponent>
                                    <Icon name='star' type='AntDesign'
                                          style={{fontSize: 18, color: colors.orange, marginLeft: 5}}/>
                                </View>
                            </View>
                            <View>
                                <TextComponent style={styles.txtRate}>Downloaded</TextComponent>
                                <TextComponent style={styles.title}>620 Users</TextComponent>
                            </View>
                            <TouchableOpacity style={styles.btnDown}>
                                <TextComponent style={styles.txtDown}>Download for $1200</TextComponent>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.body}>
                            <View style={[styles.marginTop30]}>
                                <TextComponent style={styles.text}>I failed the first quarter of a class in school , so
                                    i mad a face report card.
                                    I did this every quarter that year. I forgot that they mail home the end-year cards,
                                    and my mom go it beforeIculd intercept...Read more
                                    I failed the first quarter of a class in school , so i mad a face report card.
                                    I did this every quarter that year. I forgot that they mail home the end-year cards,
                                    and my mom go it beforeIculd intercept...Read more
                                    I failed the first quarter of a class in school , so i mad a face report card.
                                    I did this every quarter that year. I forgot that they mail home the end-year cards,
                                    and my mom go it beforeIculd intercept...Read more
                                </TextComponent>
                            </View>
                            <View style={[styles.itemHeader, {marginTop: 20}]}>
                                <TextComponent style={[styles.ti, {fontSize: 20}]}>{Locales.PopularBook}</TextComponent>
                                <TextComponent onPress={() => navigate('ListItem', {item: this.state.today})}
                                               style={[styles.textMin, {fontSize: 15}]}>{Locales.More}</TextComponent>
                            </View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={this.state.data1}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => navigate('Detail_Ebook_Two', {item: item})}
                                                      style={styles.topSing}>
                                        <FastImage style={styles.imageSinger} source={{uri: item.image}}/>
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

                    </View>

                </ScrollView>
            </View>
        );
    }
}


