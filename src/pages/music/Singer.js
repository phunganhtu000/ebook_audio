import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import FastImage from "react-native-fast-image";
import {colors} from '../../cores/styles/colors';
import {styles} from './style/styleSinger';
import api from '../../api/offline/api'
import {
    horizontalView, paddingComponent,
    rowView
} from '../../cores/styles/styleView';
import {Icon} from "native-base";
import {setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';

const {width} = Dimensions.get('window');
export default class Singer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singer: [],
            fan: []
        };
    }

    componentDidMount() {
        this.setState({
            singer: api.singer,
            fan: api.fan
        })
    }

    render() {
        const {navigation} = this.props;
        const item = this.props.navigation.state.params.item;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    left='back'
                    typeIconRight='MaterialCommunityIcons'
                    title='Singer'
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.viewAvt}>
                    <FastImage style={styles.imageSinger} source={{uri: item.image}}/>
                    <TextComponent style={styles.fullName}>Na Dam Dang</TextComponent>
                    <TextComponent style={styles.name}>@_Nakarot</TextComponent>
                    {/*<TouchableOpacity style={{*/}
                    {/*    ...rowView,*/}
                    {/*    alignItems: 'center',*/}
                    {/*    borderWidth: 1,*/}
                    {/*    borderColor: colors.lightGrey,*/}
                    {/*    padding: 5,*/}
                    {/*    marginTop: 10,*/}
                    {/*    borderRadius: 3*/}
                    {/*}}>*/}
                    {/*    <Icon name='plus' type='AntDesign'*/}
                    {/*          style={{fontSize: 15, color: colors.black, marginRight: 5}}/>*/}
                    {/*    <TextComponent style={[styles.fullName, {fontSize: 15, marginTop: 0}]}>Fan</TextComponent>*/}
                    {/*</TouchableOpacity>*/}
                    <TextComponent style={styles.fb}>Fb: Viet Jye</TextComponent>
                    <View style={styles.fanAndFollow}>
                        <View style={styles.fan}>
                            <TextComponent style={styles.txtFan}>6,282</TextComponent>
                            <TextComponent>Fans</TextComponent>
                        </View>
                        {/*<View style={styles.view}></View>*/}
                        {/*<View style={styles.follow}>*/}
                        {/*    <TextComponent style={styles.txtFollow}>1</TextComponent>*/}
                        {/*    <TextComponent>Following </TextComponent>*/}
                        {/*</View>*/}
                    </View>
                    <View style={[{...horizontalView}, {
                        width: setWidth('100%')
                        , ...paddingComponent
                    }]}>
                        <View style={{...rowView}}>
                            <Icon name='heart' type='AntDesign'
                                  style={{fontSize: 15, color: colors.lightGrey, marginRight: 5}}/>
                            <TextComponent style={[styles.fullName, {fontSize: 15, marginTop: 0}]}>66</TextComponent>

                        </View>
                        <TouchableOpacity style={{
                            borderWidth: 1,
                            borderColor: colors.lightGrey,
                            padding: 5,
                            borderRadius: 3
                        }}>
                            <TextComponent>Rate</TextComponent>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.fanRank}>
                    <TextComponent style={[styles.fullName, {marginTop: 0,}]}>Fan Rank</TextComponent>
                    <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={this.state.fan}
                        renderItem={({item}) => (
                            <TouchableOpacity>
                                <View style={styles.viewSing}>
                                    <FastImage style={styles.imageSing} source={{uri: item.image}}/>
                                    <FastImage style={styles.imgTop} source={{uri: item.top}}/>
                                </View>
                            </TouchableOpacity>
                        )}/>
                    </View>
                    <Icon name='right' type='AntDesign'
                          style={{fontSize: 25, color: colors.lightGrey, marginRight: 5}}/>
                </View>
                <View style={styles.viewAvt}>
                    <TextComponent>MeoMeo va 35 nguoi khac da dang len Fanboard</TextComponent>
                </View>
                <TouchableOpacity style={styles.fanBoard}>
                    <TextComponent style={{fontSize:18}}>Fanboard</TextComponent>
                </TouchableOpacity>
            </View>
        );
    }
}
