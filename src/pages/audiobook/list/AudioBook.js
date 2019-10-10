import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Styles from '../../details/styles/style';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import Locales from '../../../assets/languages/languages';
import {getDataOfflineMode} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import Constant from '../../../utils/Constant_Api';

export default class AudioBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // isRTL:''
        };
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl
        })
    }

    render() {
        const image = `${Constant.images}`;
        const styles = Styles.getSheet(this.state.isRTL)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.viewMagin10}>
                            <TextComponent style={styles.type}>Thông tin chi tiết</TextComponent>
                            <TextComponent style={styles.title}>{this.props.data[0].book_title}</TextComponent>
                            <View style={[styles.time, styles.horizontal]}>
                                <TextComponent style={styles.textTime}>Published from istudio</TextComponent>
                                <TextComponent style={styles.textTime}>{this.props.data[0].author_name}</TextComponent>
                            </View>
                        </View>
                        <View style={styles.viewDetail}>
                            <View style={styles.borderImage}>
                                <FastImage style={styles.image}
                                           source={{uri: `${image}${this.props.data[0].book_cover_img}`}}/>

                                <View style={styles.viewPlay}>
                                    <View style={styles.btnInfo}>
                                        <Icon name='information-outline' type='MaterialCommunityIcons'
                                              style={styles.iconWhite}/>
                                    </View>
                                    <View style={styles.btnPlay}>
                                        <Icon name='control-play' type='SimpleLineIcons'
                                              style={[styles.iconWhite, {fontSize: 18}]}/>
                                        <TextComponent style={styles.textPlay}>Audio Book</TextComponent>
                                    </View>
                                </View>
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
                                <TextComponent style={styles.textTime}>982 Rating on Google Play</TextComponent>
                            </View>
                            <View style={[styles.marginTop30]}>
                                <TextComponent style={styles.text}>I failed the first quarter of a class in school , so
                                    i mad a face report card. I did this every quarter that year. I forgot that they
                                    mail home the end-year cards, and my mom go it beforeIculd intercept...Read
                                    more</TextComponent>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


