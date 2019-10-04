import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import Styles from './style/style_Comment';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from "react-native-fast-image";
import {colors} from '../../../cores/styles/colors';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import {getDataOfflineMode} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: [
                {
                    id: 1,
                    name: 'Mixigaming',
                    content: 'Vô lý',
                    image: 'https://yt3.ggpht.com/a/AGF-l799RR3CxLJyrEVhm8cplh4DLoB58UC3qfKqBQ=s900-mo-c-c0xffffffff-rj-k-no',
                    time: '1:30'
                },
                {
                    id: 2,
                    name: 'Thầy giáo Ba',
                    content: 'Tính tiền cho anh Ba',
                    image: 'https://yt3.ggpht.com/a/AGF-l799RR3CxLJyrEVhm8cplh4DLoB58UC3qfKqBQ=s900-mo-c-c0xffffffff-rj-k-no',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
                {
                    id: 3,
                    name: 'PewPew',
                    content: 'Anh không muốn ra Hà Nội nữa',
                    image: 'https://znews-photo.zadn.vn/w660/Uploaded/lce_jwqqc/2019_05_17/45835161_621715544913361_7201762915249029120_n.jpg',
                    time: '1:30'
                },
            ],
            starCount: 2
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl
        })
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <FlatList
                            data={this.state.comment}
                            renderItem={({item}) =>
                                <View style={styles.viewall}>
                                    {/*<View style={styles.viewplayer}>*/}
                                    <FastImage source={{uri: item.image}} style={styles.image}/>
                                    <View style={styles.viewcoment}>
                                        <TextComponent style={styles.txtName}>{item.name}</TextComponent>
                                        <View style={styles.star}>
                                            <RatingBar
                                                disabled={false}
                                                maxStars={5}
                                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                rating={this.state.starCount}
                                                starSize={20}
                                                fullStarColor={colors.orange}/>
                                        </View>
                                        <TextComponent style={styles.textcontent}>{item.content}</TextComponent>
                                    </View>
                                    {/*</View>*/}
                                    <TextComponent style={{
                                        color: colors.color_text_second,
                                        fontSize: 13
                                    }}>{item.time}</TextComponent>
                                </View>}
                        />
                    </View>
                </ScrollView>
                <View style={styles.viewallinput}>
                    <TouchableOpacity style={styles.btnBook}>
                        <Text style={{color: colors.white}}>RATE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


