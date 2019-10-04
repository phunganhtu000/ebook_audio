import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon, Input} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import Styles from '../styles/style_Comment';
import {
    getDataOfflineMode,
    inValidateText,
    setHeight,
    setWidth
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
// import { FlatList } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';

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

        };
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
                <View style={styles.body}>
                    <FlatList
                        data={this.state.comment}
                        renderItem={({item}) =>
                            <View style={styles.viewall}>
                                <FastImage source={{uri: item.image}} style={styles.image}/>
                                <View style={styles.viewpepo}>
                                    <View style={styles.horizontal}>
                                        <TextComponent style={styles.txtName}>{item.name}</TextComponent>
                                        <TextComponent style={styles.txtcontent}>{item.content}</TextComponent>
                                    </View>
                                    {/*<View style={{width: '20%'}}>*/}
                                    {/*</View>*/}

                                    <TextComponent style={{
                                        color: colors.color_text_second,
                                        fontSize: 13
                                    }}>{item.time}</TextComponent>
                                </View>
                            </View>}
                    />
                </View>
                <View style={styles.viewallinput}>
                    <View style={styles.viewinput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Comment..."
                        />
                        <TouchableOpacity style={styles.toucoment}>
                            <Icon style={styles.iconcomment} type="Ionicons" name="md-send"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


