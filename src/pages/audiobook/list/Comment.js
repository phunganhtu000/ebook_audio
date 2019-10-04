import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../style/style_Comment';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import { Icon, Input } from 'native-base';
import { colors } from '../../../cores/styles/colors';
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
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <FlatList
                            data={this.state.comment}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '90%' }}>
                                    <FastImage source={{ uri: item.image }} style={styles.image} />
                                    <View style={{ marginLeft: "2.5%", width: '80%' }}>
                                        <View style={styles.horizontal}>
                                            <TextComponent style={styles.txtName }>{item.name}</TextComponent>
                                            <TextComponent style={{ color: colors.color_text_second, fontSize: 13 }}>{item.time}</TextComponent>
                                        </View>
                                        <View style={{width:'20%'}}>
                                        </View>
                                        <TextComponent style={{ color: colors.color_text_second, fontSize: 14 }}>{item.content}</TextComponent>
                                    </View>
                                </View>}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }
}


