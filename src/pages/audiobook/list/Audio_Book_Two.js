import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, ProgressBarAndroid, ProgressViewIOS,} from 'react-native';
import {styles} from '../style/style_Two';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon,} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import {rowView} from '../../../cores/styles/styleView';
import Modal from 'react-native-modal';

export default class AudioBookTwo extends Component {
    constructor() {
        super();

        this.state = {progressBarProgress: 1}
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.viewMagin10}>
                            <TextComponent style={styles.type}>HOSTORY</TextComponent>
                            <TextComponent style={styles.title}>Always forgive your enemies, nothing
                                annoys.</TextComponent>
                            <View style={[styles.time, styles.horizontal]}>
                                <TextComponent style={styles.textTime}>Published from istudio</TextComponent>
                                <TextComponent style={styles.textTime}>23 Mar, 2019</TextComponent>
                            </View>
                        </View>
                        <View style={styles.viewDetail}>
                            <View style={styles.borderImage}>
                                <FastImage style={styles.image}
                                           source={{uri: 'https://gotrangtri.vn/wp-content/uploads/2018/10/Tranh-nghe-thuat-dep-treo-tuong-phong-khach-GHS-6432-ava-400x600.jpg'}}/>
                            </View>
                        </View>
                        <View style={[styles.marginTop30, styles.viewMagin10]}>
                            <View style={styles.row}>
                                <TextComponent style={styles.textReview}>4.7</TextComponent>
                                <View style={[styles.row, {marginLeft: 10, paddingRight: 5}]}>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                </View>
                            </View>
                            <View style={styles.marginTop10}>
                                {/*<TextComponent style={styles.textTime}>982 Rating on Google Play</TextComponent>*/}
                            </View>
                            <View style={[styles.marginTop30, {...rowView}]}>
                                <View style={styles.btnPlay}>
                                    <Icon name='play' type='FontAwesome5' style={styles.iconBlack}/>
                                </View>
                                <View style={styles.itemPlay}>
                                    <TextComponent style={styles.text}>Chapter 2 : Action figure</TextComponent>
                                    <View style={{...rowView}}>
                                        <TextComponent>9:15</TextComponent>
                                        <View style={styles.marginLeft}>
                                            {
                                                (Platform.OS === 'android')
                                                    ?
                                                    (<ProgressBarAndroid progress={this.state.progressBarProgress}
                                                                         styleAttr="Horizontal" indeterminate={false}
                                                                         color={colors.red}/>)
                                                    :
                                                    (<ProgressViewIOS progress={0.5} trackTintColor={colors.background}
                                                                      progressTintColor={colors.red}/>)
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


