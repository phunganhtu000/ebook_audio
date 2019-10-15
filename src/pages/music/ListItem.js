import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import api from '../../api/offline/api';
import {
    marginRight5,
    paddingBottom5,
    rowView,
} from '../../cores/styles/styleView';
import {Icon} from 'native-base';
import {getDataOfflineMode, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import Styles from './style/styles';
import constants from '../../assets/constants';

const {width} = Dimensions.get('window');

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMusic: [],
        };
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            listMusic: api.music,
            isRTL: rtl,
        });
    }

    render() {
        const data = this.props.navigation.state.params.item;
        const {navigation} = this.props;
        const styles = Styles.getSheet(this.state.isRTL);
        // console.log('data:' + JSON.stringify(this.state.listMusic));
        return (
            <View style={styles.listItemContainer}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    left='back'
                    onPressLeft={() => navigation.goBack()}
                    title={data}
                />
                <View style={styles.flatList}>
                    <FlatList
                        data={this.state.listMusic}
                        renderItem={({item}) => (
                            <View style={styles.viewbody2}>
                                <FastImage style={styles.imageMedium} source={{uri: item.image}}/>
                                <View style={{marginLeft: 10}}>
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
                                            <TextComponent style={styles.textMin}>{item.likesr}</TextComponent>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}/>
                </View>
            </View>
        );
    }
}

